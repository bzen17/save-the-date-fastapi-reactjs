from db.database import events
from bson.objectid import ObjectId

def event_helper(event):
    responseEvent = {
        "id": str(event["_id"]),
        "username": event["username"],
        "occasion": event["occasion"],
        "day": event["day"],
        "month": event["month"],
        "name": event["name"],
        "relation": event["relation"],
    }
    return responseEvent

# Retrieve all events present in the database
async def retrieve_all_events():
    event_list = []
    async for event in events.find():
        event_list.append(event_helper(event))
    return event_list

# Add a new event into to the database
async def add_event(event_data: dict) -> dict:
    event = await events.insert_one(event_data)
    new_event = await events.find_one({"_id": event.inserted_id})
    return event_helper(new_event)

# Retrieve all events of user with a matching ID
async def retrieve_user_events(username: str, day: int, month:str, upcoming: int) -> dict:
    event_list = []
    months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
    ]
    query = {"username": username}
    if upcoming:
        currMonth = months.index(month)
        query["month"] = {"$in":months[currMonth+1:currMonth+upcoming+1]}
    else:
        if day:
            query["day"] = {"$gte": day}
        if month:
            query["month"] = month
    
    async for event in events.find(query):
        event_list.append(event_helper(event))
    return event_list

# Retrieve event by ID
async def retrieve_event(id: str) -> dict:
    event = await events.find_one({"_id": ObjectId(id)})
    if event:
        return event_helper(event)

# Update a event with a matching ID
async def update_event(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    event = await events.find_one({"_id": ObjectId(id)})
    if event:
        updated_event = await events.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_event:
            return True
        return False

# Delete a event from the database
async def delete_event(id: str):
    event = await events.find_one({"_id": ObjectId(id)})
    if event:
        await events.delete_one({"_id": ObjectId(id)})
        return True