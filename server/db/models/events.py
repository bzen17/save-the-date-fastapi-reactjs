from pydantic import BaseModel,EmailStr,SecretStr,Field
from typing import Optional

class Event(BaseModel):
    username: str = Field(..., description="Username of the user who created the event")
    occasion: str = Field(..., max_length=150)
    day: int = Field(...,  ge=1,le=31)
    month: str = Field(..., max_length=3)
    name: str = Field(..., max_length=300)
    relation: str = Field(..., max_length=100)
