from pydantic import BaseModel,EmailStr,SecretStr
from typing import Optional

class User(BaseModel):
    username: str
    email: EmailStr
    fullname: str
    is_active: bool
    is_admin: Optional[bool] = None


class UserInDB(User):
    hashed_password: SecretStr

class UserInBody(User):
    password: SecretStr