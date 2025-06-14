from datetime import datetime, timedelta
from uuid import uuid4

from jose import jwt, JWTError
import core.envs as envs

from db.database import SessionLocal
from db.entity.users import User
from fastapi import HTTPException, status
from fastapi.logger import logger


def create_token(user_id: str) -> str:
    now = datetime.now()
    payload = {
        "jti": str(uuid4()),
        "sub": str(user_id),
        "iat": now,
        "exp": now + timedelta(seconds=int(envs.JWT_EXPIRATION_DELTA)),
    }
    return jwt.encode(
        payload,
        envs.JWT_SECRET_KEY,
        algorithm=envs.JWT_ALGORITHM,
    )

def verify_token(token: str) -> User:
    try:
        payload = jwt.decode(
            token,
            envs.JWT_SECRET_KEY,
            algorithms=[envs.JWT_ALGORITHM],
        )
    except JWTError as e:
        logger.error(f"JWT decode failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing subject"
        )

    db = SessionLocal()
    try:
        user = db.query(User).filter_by(user_id=user_id).first()
    finally:
        db.close()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user
