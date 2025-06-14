from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base
from .time_mixin import TimeMixin

class Donation(Base, TimeMixin):
    __tablename__ = "donations"

    donation_id          = Column(Integer, primary_key=True, autoincrement=True)
    fridge_id            = Column(Integer, ForeignKey("fridges.fridge_id"), nullable=False)
    user_id              = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    name                 = Column(String(100), nullable=False)
    quantity             = Column(Integer, nullable=False)

    fridge               = relationship("Fridge", back_populates="donations")
    user                 = relationship("User", back_populates="donations")
    volunteer_donation   = relationship("VolunteerDonation", back_populates="donation")

    def __init__(
        self,
        *,
        fridge_id: int,
        user_id: str,
        name: str,
        quantity: int,
    ) -> None:
        super().__init__()
        self.fridge_id   = fridge_id
        self.user_id     = user_id
        self.name        = name
        self.quantity    = quantity
