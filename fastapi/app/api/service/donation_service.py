from typing import List
from sqlalchemy.orm import Session

from core.exception import CustomException, handle_exception
from core.s3 import get_presigned_download_url
from dto.base_dto import BaseResponseDTO
from dto.donation_dto import (
    DonationDTO,
    AddDonationRequestDTO,
    AddDonationResponseDTO,
)
from db.entity.donations import Donation
from db.entity.stores import Store
from db.entity.users import User


def add_donation_service(
    dto: AddDonationRequestDTO, user: User, db: Session
) -> BaseResponseDTO[AddDonationResponseDTO] | None:
    try:
        donation = Donation(
            fridge_id=dto.fridge_id,
            user_id=user.user_id,
            name=dto.name,
            quantity=dto.quantity,
        )
        db.add(donation)
        db.commit()
        db.refresh(donation)

        image_key = f"donation/{donation.donation_id}.jpg"
        image_url = get_presigned_download_url(image_key)

        response_dto = AddDonationResponseDTO(image_url=image_url)
        return BaseResponseDTO[AddDonationResponseDTO](
            success=True,
            code=201,
            message="Donation created successfully.",
            data=response_dto,
        )
    except Exception as e:
        handle_exception(e, db)


def get_user_donations_service(
    user: User, db: Session
) -> BaseResponseDTO[List[DonationDTO]] | None:
    try:
        donations = db.query(Donation).filter_by(user_id=user.user_id).all()
        items: List[DonationDTO] = []
        for d in donations:
            image_key = f"donation/{d.donation_id}.jpg"
            image_url = get_presigned_download_url(image_key)
            items.append(
                DonationDTO(
                    name=d.name,
                    quantity=d.quantity,
                    image_url=image_url,
                )
            )

        return BaseResponseDTO[List[DonationDTO]](
            success=True,
            code=200,
            message="User donations retrieved successfully.",
            data=items,
        )
    except Exception as e:
        handle_exception(e, db)


def get_store_donations_service(
    store_id: int, db: Session
) -> BaseResponseDTO[List[DonationDTO]] | None:
    try:
        store = db.query(Store).filter_by(store_id=store_id).first()
        if not store:
            raise CustomException(404, "Store not found.")

        return get_user_donations_service(store.user, db)
    except Exception as e:
        handle_exception(e, db)
