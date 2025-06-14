from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.dep import get_db, get_user_optional
from dto.base_dto import BaseResponseDTO
from dto.donation_dto import DonationDTO, AddDonationRequestDTO, AddDonationResponseDTO
from api.service.donation_service import (
    add_donation_service,
    get_user_donations_service,
    get_store_donations_service,
)
from db.entity.users import User

donation_router = APIRouter()


@donation_router.post(
    "/donation",
    response_model=BaseResponseDTO[AddDonationResponseDTO],
)
def add_donation_route(
    dto: AddDonationRequestDTO,
    db: Session = Depends(get_db),
    user: User = Depends(get_user_optional),
) -> BaseResponseDTO[AddDonationResponseDTO]:
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    return add_donation_service(dto, user, db)


@donation_router.get(
    "/donations",
    response_model=BaseResponseDTO[List[DonationDTO]],
)
def get_user_donations_route(
    db: Session = Depends(get_db),
    user: User = Depends(get_user_optional),
) -> BaseResponseDTO[List[DonationDTO]]:
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    return get_user_donations_service(user, db)


@donation_router.get(
    "/donations/{store_id}",
    response_model=BaseResponseDTO[List[DonationDTO]],
)
def get_store_donations_route(
    store_id: int,
    db: Session = Depends(get_db),
) -> BaseResponseDTO[List[DonationDTO]]:
    return get_store_donations_service(store_id, db)
