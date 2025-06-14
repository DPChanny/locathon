from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base
from .time_mixin import TimeMixin

class Social(Base, TimeMixin):
    __tablename__ = "social"

    social_id     = Column(Integer, primary_key=True, autoincrement=True)
    provider      = Column(String(50), nullable=False)
    provider_sub  = Column(String(200), nullable=False)
    user_id       = Column(Integer, ForeignKey("users.user_id"), nullable=False)

    user          = relationship("User", back_populates="social")

    def __init__(
        self,
        *,
        provider: str,
        provider_sub: str,
        user_id: str,
    ) -> None:
        super().__init__()
        self.provider     = provider
        self.provider_sub = provider_sub
        self.user_id      = user_id
