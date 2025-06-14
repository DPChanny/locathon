from typing import Optional
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base
from .time_mixin import TimeMixin

class User(Base, TimeMixin):
    __tablename__ = "users"

    user_id         = Column(Integer, primary_key=True, autoincrement=True)
    name            = Column(String(100), unique=True, nullable=False)
    password        = Column(String(200))

    store           = relationship("Store", back_populates="user", uselist=False)
    donations       = relationship("Donation", back_populates="user")
    volunteer_hours = relationship("VolunteerHour", back_populates="user")
    social          = relationship("Social", back_populates="user")

    def __init__(
        self,
        *,
        name: str,
        password: Optional[str] = None,
        store_id: Optional[int] = None,
    ) -> None:
        super().__init__()
        self.name      = name
        self.password  = password
        self.store_id  = store_id
