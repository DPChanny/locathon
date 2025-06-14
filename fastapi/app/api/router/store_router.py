from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.dep import get_db, get_user
from dto.base_dto import BaseResponseDTO
from dto.store_dto import (
    AddStoreRequestDTO,
    UpdateStoreRequestDTO,
    AddStoreResponseDTO,
    UpdateStoreResponseDTO,
    StoreDTO,
    StoreDetailDTO,
)
from api.service.store_service import (
    add_store_service,
    update_store_service,
    get_stores_service,
    get_store_details_service,
    get_user_store_detail_service,
    get_store_detail_service,
)

store_router = APIRouter()


@store_router.post("/store", response_model=BaseResponseDTO[AddStoreResponseDTO])
def add_store_route(
    dto: AddStoreRequestDTO, db: Session = Depends(get_db), user=Depends(get_user)
) -> BaseResponseDTO[AddStoreResponseDTO]:
    return add_store_service(dto, user, db)


@store_router.patch("/store", response_model=BaseResponseDTO[UpdateStoreResponseDTO])
def update_store_route(
    dto: UpdateStoreRequestDTO, db: Session = Depends(get_db), user=Depends(get_user)
) -> BaseResponseDTO[UpdateStoreResponseDTO]:
    return update_store_service(dto, user, db)


@store_router.get("/stores", response_model=BaseResponseDTO[List[StoreDTO]])
def get_stores_route(db: Session = Depends(get_db)) -> BaseResponseDTO[List[StoreDTO]]:
    return get_stores_service(db)


@store_router.get(
    "/store-details", response_model=BaseResponseDTO[List[StoreDetailDTO]]
)
def get_store_details_route(
    db: Session = Depends(get_db),
) -> BaseResponseDTO[List[StoreDetailDTO]]:
    return get_store_details_service(db)


@store_router.get("/store", response_model=BaseResponseDTO[StoreDetailDTO])
def get_user_store_detail_route(
    db: Session = Depends(get_db), user=Depends(get_user)
) -> BaseResponseDTO[StoreDetailDTO]:
    return get_user_store_detail_service(user, db)


@store_router.get("/store/{store_id}", response_model=BaseResponseDTO[StoreDetailDTO])
def get_store_detail_route(
    store_id: int, db: Session = Depends(get_db)
) -> BaseResponseDTO[StoreDetailDTO]:
    return get_store_detail_service(store_id, db)
