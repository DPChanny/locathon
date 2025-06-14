from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base
from .time_mixin import TimeMixin

class StoreImage(Base, TimeMixin):
    __tablename__ = "store_images"

    store_image_id = Column(Integer, primary_key=True, autoincrement=True)
    store_id       = Column(Integer, ForeignKey("stores.store_id"), nullable=False)

    store          = relationship("Store", back_populates="store_images")

    def __init__(
        self,
        *,
        store_id: int,
    ) -> None:
        super().__init__()
        self.store_id  = store_id