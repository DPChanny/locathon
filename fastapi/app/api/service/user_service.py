from typing import Callable, Optional

from fastapi import HTTPException
from starlette import status
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from jose import JWTError

from core.auth import create_token
from core.social.google import verify as verify_google
# from core.social.kakao import verify as verify_kakao
# from core.social.naver import verify as verify_naver
from db.entity.users import User
from db.entity.socials import Social
from dto.user_dto import LoginRequestDTO

# Map of provider → verify function returning (sub, name, image_url)
_SOCIAL_VERIFY: dict[str, Callable[[str], tuple[str, str, str]]] = {
    "google": verify_google,
    # "kakao": verify_kakao,
    # "naver": verify_naver,
}

def login_service(dto: LoginRequestDTO, db: Session) -> str:
    if dto.name is not None:
        return _handle_local_login(dto.name, dto.password, db)

    if dto.provider and dto.id_token:
        return _handle_social_login(dto.provider, dto.id_token, db)

    raise HTTPException(
        status.HTTP_400_BAD_REQUEST,
        "Provide either (name + password) or (provider + id_token)."
    )


def _handle_local_login(
    name: str,
    password: Optional[str],
    db: Session
) -> str:
    if not password:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            "Password is required for local login."
        )

    user = db.query(User).filter_by(name=name).first()
    if user:
        # existing user: verify password
        if not bcrypt.verify(password, user.password or ""):
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                "Invalid credentials."
            )
    else:
        # new user: create with default image
        hashed = bcrypt.hash(password)
        user = User(
            name=name,
            password=hashed,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    return create_token(user.user_id)


def _handle_social_login(
    provider: str,
    id_token: str,
    db: Session
) -> str:
    verify_fn = _SOCIAL_VERIFY.get(provider.lower())
    if not verify_fn:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            f"Unsupported provider '{provider}'."
        )

    try:
        sub, name, image_url = verify_fn(id_token)
    except JWTError:
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            "Invalid or expired id_token."
        )

    social = (
        db.query(Social)
          .filter_by(provider=provider, provider_sub=sub)
          .first()
    )

    if social:
        user = social.user
    else:
        user = User(
            name=name,
        )
        db.add(user)
        db.flush()  # assign user.user_id

        social = Social(
            provider=provider,
            provider_sub=sub,
            user_id=user.user_id
        )
        db.add(social)
        db.commit()
        db.refresh(user)

    return create_token(user.user_id)
