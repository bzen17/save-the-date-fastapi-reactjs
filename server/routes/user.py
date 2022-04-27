from fastapi import APIRouter, Body,Depends
from fastapi.encoders import jsonable_encoder
from utils.auth import *
from utils.db.users import (
    retrieve_user,
    retrieve_users,
    update_user,
    delete_user,
)
from db.models import *

router = APIRouter()

@router.get("/", response_description="users retrieved")
async def get_users(current_user: User = Depends(get_current_admin_user)):
    users = await retrieve_users()
    if users:
        return ResponseModel(users, "users data retrieved successfully")
    return ResponseModel(users, "Empty list returned")


@router.get("/{username}", response_description="user data retrieved")
async def get_user_data(username,current_user: User = Depends(get_current_admin_user)):
    user = await retrieve_user(username)
    if user:
        return ResponseModel(user, "user data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "user doesn't exist.")

@router.put("/{username}")
async def update_user_data(username: str, req: UserInBody = Body(...),current_user: User = Depends(get_current_admin_user)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_user = await update_user(id, req)
    if updated_user:
        return ResponseModel(
            "user with Username: {} name update is successful".format(username),
            "user name updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the user data.",
    )

@router.delete("/{username}", response_description="user data deleted from the database")
async def delete_user_data(username: str,current_user: User = Depends(get_current_admin_user)):
    deleted_user = await delete_user(username)
    if deleted_user:
        return ResponseModel(
            "user with Username: {} removed".format(username), "user deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "user with username {0} doesn't exist".format(username)
    )