from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from datetime import timedelta
from utils.auth import *
from utils.db.users import *
from db.models import *
from config.importEnv import *
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "Bearer"}

@router.post("/signup")
async def signup(user: UserInBody = Body(...)):
    user = jsonable_encoder(user)
    user = await add_user(user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating user",
        )
    return {"user": user, "message": "User created successfully"}

@router.get("/me", response_model=User)
async def read_current_active_user(current_user: User = Depends(get_current_active_user)):
    return current_user
