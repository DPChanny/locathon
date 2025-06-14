from typing import Optional

from pydantic import BaseModel

class LoginRequestDTO(BaseModel):
    name: Optional[str] = None
    password: Optional[str] = None

    provider: Optional[str] = None
    id_token: Optional[str] = None

class LoginResponseDTO(BaseModel):
    access_token: str