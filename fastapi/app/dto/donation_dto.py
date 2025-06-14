from pydantic import BaseModel

class DonationDTO(BaseModel):
    name: str
    quantity: int
    image_url: str

class AddDonationRequestDTO(BaseModel):
    fridge_id: int
    name: str
    quantity: int

class AddDonationResponseDTO(BaseModel):
    image_url: str