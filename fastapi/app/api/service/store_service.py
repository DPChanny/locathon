from typing import List, Type
from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload
from core.exception import CustomException, handle_exception
from core.s3 import get_presigned_download_url, get_presigned_upload_url, is_key_exists
from dto.base_dto import BaseResponseDTO
from dto.store_dto import (
    StoreDTO,
    StoreDetailDTO,
    AddStoreRequestDTO,
    UpdateStoreRequestDTO,
    AddStoreResponseDTO,
    UpdateStoreResponseDTO,
)
from dto.store_image_dto import (
    StoreImageDTO,
    AddStoreImageResponseDTO,
    UpdateStoreImageResponseDTO,
)
from db.entity.stores import Store
from db.entity.store_images import StoreImage
from db.entity.donations import Donation
from db.entity.users import User

DEFAULT_STORE_KEY = "store/default.jpg"
DEFAULT_STORE_IMAGE_KEY = "store_image/default.jpg"
CONTENT_TYPE_JPEG = "image/jpeg"


def _build_store_detail(store: Type[Store], db: Session) -> StoreDetailDTO:
    donation_count = (
        db.query(func.count(Donation.donation_id))
        .filter_by(user_id=store.user_id)
        .scalar()
        or 0
    )
    main_key = f"store/{store.store_id}.jpg"
    if not is_key_exists(main_key):
        main_key = DEFAULT_STORE_KEY
    main_url = get_presigned_download_url(main_key)
    images: List[StoreImageDTO] = []
    for si in store.store_images:
        img_key = f"store_image/{si.store_image_id}.jpg"
        if not is_key_exists(img_key):
            img_key = DEFAULT_STORE_IMAGE_KEY
        images.append(
            StoreImageDTO(
                store_image_id=si.store_image_id,
                image_url=get_presigned_download_url(img_key),
            )
        )
    return StoreDetailDTO(
        store_id=store.store_id,
        donation_count=donation_count,
        name=store.name,
        contact=store.contact,
        address=store.address,
        latitude=store.latitude,
        longitude=store.longitude,
        category=store.category,
        image_url=main_url,
        description=store.description,
        created_at=store.created_at.isoformat(),
        updated_at=store.updated_at.isoformat(),
        store_images=images,
    )


def add_store_service(
    dto: AddStoreRequestDTO, user: User, db: Session
) -> BaseResponseDTO[AddStoreResponseDTO] | None:
    try:
        store = Store(
            user_id=user.user_id,
            name=dto.name,
            contact=dto.contact,
            address=dto.address,
            latitude=dto.latitude,
            longitude=dto.longitude,
            category=dto.category,
            description=dto.description,
        )
        db.add(store)
        db.commit()
        db.refresh(store)
        new_images: List[StoreImage] = []
        for _ in range(dto.image_count):
            si = StoreImage(store_id=store.store_id)
            db.add(si)
            db.flush()
            new_images.append(si)
        db.commit()
        main_upload_url = get_presigned_upload_url(
            key=f"store/{store.store_id}.jpg", content_type=CONTENT_TYPE_JPEG
        )
        image_urls = [
            AddStoreImageResponseDTO(
                image_url=get_presigned_upload_url(
                    key=f"store_image/{si.store_image_id}.jpg",
                    content_type=CONTENT_TYPE_JPEG,
                )
            )
            for si in new_images
        ]
        payload = AddStoreResponseDTO(
            image_url=main_upload_url, store_images=image_urls
        )
        return BaseResponseDTO[AddStoreResponseDTO](
            success=True,
            code=201,
            message="Store created. Upload URLs generated.",
            data=payload,
        )
    except Exception as e:
        handle_exception(e, db)


def update_store_service(
    dto: UpdateStoreRequestDTO, user: User, db: Session
) -> BaseResponseDTO[UpdateStoreResponseDTO] | None:
    try:
        store = db.query(Store).filter_by(user_id=user.user_id).first()
        if not store:
            raise CustomException(404, "Store not found.")
        for key, value in dto.model_dump(exclude_unset=True).items():
            if key != "image_count":
                setattr(store, key, value)
        db.commit()
        db.refresh(store)
        db.query(StoreImage).filter_by(store_id=store.store_id).delete()
        db.commit()
        new_images: List[StoreImage] = []
        for _ in range(dto.image_count):
            si = StoreImage(store_id=store.store_id)
            db.add(si)
            db.flush()
            new_images.append(si)
        db.commit()
        main_upload_url = get_presigned_upload_url(
            key=f"store/{store.store_id}.jpg", content_type=CONTENT_TYPE_JPEG
        )
        image_urls = [
            UpdateStoreImageResponseDTO(
                image_url=get_presigned_upload_url(
                    key=f"store_image/{si.store_image_id}.jpg",
                    content_type=CONTENT_TYPE_JPEG,
                )
            )
            for si in new_images
        ]
        return BaseResponseDTO[UpdateStoreResponseDTO](
            success=True,
            code=200,
            message="Store updated. Upload URLs generated.",
            data=UpdateStoreResponseDTO(
                image_url=main_upload_url, store_images=image_urls
            ),
        )
    except Exception as e:
        handle_exception(e, db)


def get_stores_service(db: Session) -> BaseResponseDTO[List[StoreDTO]] | None:
    try:
        stores = db.query(Store).all()
        items: List[StoreDTO] = []
        for s in stores:
            cnt = (
                db.query(func.count(Donation.donation_id))
                .filter_by(user_id=s.user_id)
                .scalar()
                or 0
            )
            main_key = f"store/{s.store_id}.jpg"
            if not is_key_exists(main_key):
                main_key = DEFAULT_STORE_KEY
            main_url = get_presigned_download_url(main_key)
            items.append(
                StoreDTO(
                    store_id=s.store_id,
                    donation_count=cnt,
                    name=s.name,
                    image_url=main_url,
                )
            )
        return BaseResponseDTO[List[StoreDTO]](
            success=True,
            code=200,
            message="Store list retrieved successfully.",
            data=items,
        )
    except Exception as e:
        handle_exception(e, db)


def get_store_details_service(
    db: Session,
) -> BaseResponseDTO[List[StoreDetailDTO]] | None:
    try:
        stores = db.query(Store).options(joinedload(Store.store_images)).all()
        items = [_build_store_detail(s, db) for s in stores]
        return BaseResponseDTO[List[StoreDetailDTO]](
            success=True,
            code=200,
            message="Store detail list retrieved successfully.",
            data=items,
        )
    except Exception as e:
        handle_exception(e, db)


def get_user_store_detail_service(
    user, db: Session
) -> BaseResponseDTO[StoreDetailDTO] | None:
    try:
        store = db.query(Store).filter_by(user_id=user.user_id).first()
        if not store:
            raise CustomException(404, "Store not found.")
        return get_store_detail_service(store.store_id, db)
    except Exception as e:
        handle_exception(e, db)


def get_store_detail_service(
    store_id: int, db: Session
) -> BaseResponseDTO[StoreDetailDTO] | None:
    try:
        store = (
            db.query(Store)
            .options(joinedload(Store.store_images))
            .filter_by(store_id=store_id)
            .first()
        )
        if not store:
            raise CustomException(404, "Store not found.")
        detail = _build_store_detail(store, db)
        return BaseResponseDTO[StoreDetailDTO](
            success=True,
            code=200,
            message="Store detail retrieved successfully.",
            data=detail,
        )
    except Exception as e:
        handle_exception(e, db)
