from typing import Optional
from sqlalchemy import Column, String, Integer, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base
from .time_mixin import TimeMixin

class Store(Base, TimeMixin):
    __tablename__ = "stores"

    store_id     = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True, nullable=False)
    name         = Column(String(100), nullable=False)
    contact      = Column(String(100))
    address      = Column(String(200))
    latitude     = Column(Float, nullable=False)
    longitude    = Column(Float, nullable=False)
    category     = Column(String(100))
    description  = Column(Text)

    user        = relationship("User", back_populates="store", foreign_keys=[user_id])
    store_images = relationship("StoreImage", back_populates="store")

    def __init__(
        self,
        *,
        user_id: int,
        name: str,
        contact: Optional[str]     = None,
        address: Optional[str]     = None,
        latitude: float,
        longitude: float,
        category: Optional[str]    = None,
        description: Optional[str] = None,
    ) -> None:
        super().__init__()
        self.user_id     = user_id
        self.name        = name
        self.contact     = contact
        self.address     = address
        self.latitude    = latitude
        self.longitude   = longitude
        self.category    = category
        self.description = description
