from typing import Optional
from sqlalchemy import Column, String, Integer, Float, Text
from sqlalchemy.orm import relationship
from db.database import Base
from .time_mixin import TimeMixin

class Fridge(Base, TimeMixin):
    __tablename__ = "fridges"

    fridge_id   = Column(Integer, primary_key=True, autoincrement=True)
    name        = Column(String(100), nullable=False)
    address     = Column(String(200))
    latitude    = Column(Float, nullable=False)
    longitude   = Column(Float, nullable=False)
    description = Column(Text)
    contact     = Column(String(100))

    donations   = relationship("Donation", back_populates="fridge")

    def __init__(
        self,
        *,
        name: str,
        address: Optional[str]   = None,
        latitude: float,
        longitude: float,
        description: Optional[str] = None,
        contact: Optional[str]     = None,
    ) -> None:
        super().__init__()
        self.name        = name
        self.address     = address
        self.latitude    = latitude
        self.longitude   = longitude
        self.description = description
        self.contact     = contact
