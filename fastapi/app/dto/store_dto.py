from typing import Optional
from pydantic import BaseModel

from dto.base_dto import TimeMixin
from dto.store_image_dto import (
    StoreImageDTO,
    AddStoreImageResponseDTO,
    UpdateStoreImageResponseDTO,
)


class StoreDTO(BaseModel):
    store_id: int
    image_url: str
    donation_count: int
    name: str


class StoreDetailDTO(StoreDTO, TimeMixin):
    contact: Optional[str]
    address: Optional[str]
    latitude: float
    longitude: float
    category: Optional[str]
    description: Optional[str]

    store_images: list[StoreImageDTO]


class AddStoreRequestDTO(BaseModel):
    name: str
    contact: Optional[str] = None
    address: Optional[str] = None
    latitude: float
    longitude: float
    category: Optional[str] = None
    description: Optional[str] = None
    image_count: int


class AddStoreResponseDTO(BaseModel):
    image_url: str
    store_images: list[AddStoreImageResponseDTO]


class UpdateStoreRequestDTO(BaseModel):
    name: Optional[str] = None
    contact: Optional[str] = None
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    category: Optional[str] = None
    description: Optional[str] = None
    image_count: int


class UpdateStoreResponseDTO(BaseModel):
    image_url: str
    store_images: list[UpdateStoreImageResponseDTO]
