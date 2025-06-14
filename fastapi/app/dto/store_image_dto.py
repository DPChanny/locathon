from pydantic import BaseModel

from db.entity.time_mixin import TimeMixin


class StoreImageDTO(BaseModel):
    store_image_id: int
    image_url: str

class GetStoreImageDetailResponseDTO(StoreImageDTO, TimeMixin):
    store_id: int

class AddStoreImageResponseDTO(BaseModel):
    image_url: str

class UpdateStoreImageResponseDTO(BaseModel):
    image_url: str