from motor import motor_asyncio
from config.importEnv import *

client = motor_asyncio.AsyncIOMotorClient(MONGO_DB_URL)
database = client[MONGO_DB_NAME]
users = database.get_collection("users")
events = database.get_collection("events")