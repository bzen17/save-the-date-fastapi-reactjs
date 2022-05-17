from db.database import users
from bson.objectid import ObjectId
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def user_helper(user) -> dict:
    responseUser = {
        "id": str(user["_id"]),
        "fullname": user["fullname"],
        "email": user["email"],
        "username": user["username"],
        "is_active": user["is_active"],
        "hashed_password": user["hashed_password"],
    }
    if 'is_admin' in user:
        responseUser['is_admin'] = user['is_admin']
    return responseUser

# Retrieve all users present in the database
async def retrieve_users():
    user_list = []
    async for user in users.find():
        user_list.append(user_helper(user))
    return user_list


# Add a new user into to the database
async def add_user(user_data: dict) -> dict:
    user_data["hashed_password"] = get_password_hash(user_data["password"])
    user_data.pop("password")
    user = await users.insert_one(user_data)
    new_user = await users.find_one({"_id": user.inserted_id})
    return user_helper(new_user)


# Retrieve a user with a matching ID
async def retrieve_user(username: str) -> dict:
    user = await users.find_one({"username": username})
    if user:
        return user_helper(user)


# Update a user with a matching ID
async def update_user(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    user = await users.find_one({"_id": ObjectId(id)})
    if user:
        data["hashed_password"] = get_password_hash(data["password"])
        data.pop("password")
        updated_user = await users.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_user:
            return True
        return False


# Delete a user from the database
async def delete_user(id: str):
    user = await users.find_one({"_id": ObjectId(id)})
    if user:
        await users.delete_one({"_id": ObjectId(id)})
        return True

async def generate_username(email: str, itr: int = 1) -> str:
    username = email.split("@")[0]
    user = await retrieve_user(username)
    if (user):
        if (email!=user["email"]):
            return await generate_username(username+str(itr),itr+1)
        else:
            return False
    return username