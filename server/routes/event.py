from fastapi import APIRouter, Body,Depends
from utils.auth import *
from fastapi.encoders import jsonable_encoder
from utils.db.events import *
from db.models import *
from typing import Optional

router = APIRouter()

@router.get("/all", response_description="Event retrieved")
async def get_all_events(current_user: User = Depends(get_current_admin_user)):
    events = await retrieve_all_events()
    if len(events) > 0:
        return ResponseModel(events, "Event data retrieved successfully")
    return ResponseModel(events, "Empty list returned")


@router.get("/", response_description="Event data retrieved")
async def get_user_events(day: Optional[int] = None,month: Optional[str] = None, upcoming: Optional[int] = None, current_user: User = Depends(get_current_active_user)):
    events = await retrieve_user_events(current_user['username'], day, month, upcoming)
    if len(events) > 0:
        return ResponseModel(events, "Event data retrieved successfully")
    return ResponseModel(events, "Empty list returned")


@router.post("/", response_description="Event data added")
async def add_user_event(req: Event = Body(...),current_user: User = Depends(get_current_active_user)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    if (current_user['username'] == req['username']):
        event = await add_event(req)
    else :
        return ErrorResponseModel("Request made for incorrect user.", 401, "Unauthorized access.")
    if event:
        return ResponseModel(event, "Event data added successfully")
    return ErrorResponseModel("An error occurred.", 404, "User doesn't exist.")


@router.put("/{id}")
async def update_event_data(id: str, req: Event = Body(...),current_user: User = Depends(get_current_active_user)):
    event = await retrieve_event(id)
    if (current_user['username'] == event['username']):
        req = {k: v for k, v in req.dict().items() if v is not None}
        updated_event = await update_event(id, req)
    else :
        return ErrorResponseModel("Request made for incorrect user.", 401, "Unauthorized access.")
    if updated_event:
        return ResponseModel(
            "Event with ID: {} update is successful".format(id),
            "Event updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the event data.",
    )


@router.delete("/{id}", response_description="Event data deleted from the database")
async def delete_event_data(id: str,current_user: User = Depends(get_current_active_user)):
    event = await retrieve_event(id)
    if (current_user['username'] == event['username']):
        deleted_user = await delete_user(id)
    else :
        return ErrorResponseModel("Request made for incorrect user.", 401, "Unauthorized access.")
    if deleted_user:
        return ResponseModel(
            "Event with ID: {} removed".format(id), "Event deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "Event with ID: {} doesn't exist".format(id)
    )