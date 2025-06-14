from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base
from .time_mixin import TimeMixin

class VolunteerHour(Base, TimeMixin):
    __tablename__ = "volunteer_hours"

    volunteer_hour_id    = Column(Integer, primary_key=True, autoincrement=True)
    user_id              = Column(Integer, ForeignKey("users.user_id"), nullable=False)

    user                 = relationship("User", back_populates="volunteer_hours")
    volunteer_donations  = relationship("VolunteerDonation", back_populates="volunteer_hour")

    def __init__(
        self,
        *,
        user_id: str,
    ) -> None:
        super().__init__()
        self.user_id      = user_id
