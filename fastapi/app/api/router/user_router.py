from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.dep import get_db
from dto.base_dto import BaseResponseDTO
from dto.user_dto import LoginRequestDTO, LoginResponseDTO
from api.service.user_service import login_service

user_router = APIRouter(prefix="/user", tags=["user"])


@user_router.post(
    "/login",
    response_model=BaseResponseDTO[LoginResponseDTO],
)
def login_route(
    dto: LoginRequestDTO,
    db: Session = Depends(get_db),
):
    access_token = login_service(dto, db)
    return BaseResponseDTO(
        success=True,
        code=200,
        message="Login successful",
        data=LoginResponseDTO(access_token=access_token),
    )
