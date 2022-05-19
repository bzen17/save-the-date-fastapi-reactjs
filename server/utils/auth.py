from datetime import datetime, timedelta
from typing import Optional
from utils.auth import *
from db.models import *
from utils.db.users import *
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from config.importEnv import *
import json

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def authenticate_user(username: str, password: str):
    user = await retrieve_user(username)
    if not user:
        return False
    if not verify_password(password, user['hashed_password']):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user: dict = json.loads(payload.get("sub"))
        if user is None:
            raise credentials_exception
        token_data = TokenData(**user)
    except JWTError:
        raise credentials_exception
    user = await retrieve_user(token_data.un)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if not current_user['is_active']:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

async def get_current_admin_user(current_user: User = Depends(get_current_user)):
    if not current_user['is_active']:
        raise HTTPException(status_code=400, detail="Inactive user")
    if 'is_admin' in current_user:
        if not current_user['is_admin']:
            raise HTTPException(status_code=400, detail="Not an admin user")
    else:
        raise HTTPException(status_code=400, detail="Not an admin user")
    return current_user