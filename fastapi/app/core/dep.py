from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from core.auth import verify_token
from db.database import SessionLocal
from db.entity.users import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/user/login")

def get_user(token: str = Depends(oauth2_scheme)) -> User:
    try:
        user = verify_token(token)
    except HTTPException as e:
        raise HTTPException(
            status_code=e.status_code,
            detail=e.detail,
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

oauth2_scheme_optional = OAuth2PasswordBearer(tokenUrl="/api/user/login", auto_error=False)

def get_user_optional(token: str | None = Depends(oauth2_scheme_optional)) -> User | None:
    if not token:
        return None
    try:
        return verify_token(token)
    except HTTPException:
        return None

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
