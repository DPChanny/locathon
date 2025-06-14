from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base
from .time_mixin import TimeMixin

class VolunteerDonation(Base, TimeMixin):
    __tablename__ = "volunteer_donations"

    volunteer_hour_id = Column(
        Integer,
        ForeignKey("volunteer_hours.volunteer_hour_id"),
        primary_key=True
    )
    donation_id = Column(
        Integer,
        ForeignKey("donations.donation_id"),
        primary_key=True
    )

    volunteer_hour = relationship(
        "VolunteerHour",
        back_populates="volunteer_donations"
    )
    donation = relationship(
        "Donation",
        back_populates="volunteer_donation"
    )

    def __init__(
        self,
        *,
        volunteer_hour_id: int,
        donation_id: int
    ) -> None:
        super().__init__()
        self.volunteer_hour_id = volunteer_hour_id
        self.donation_id       = donation_id
