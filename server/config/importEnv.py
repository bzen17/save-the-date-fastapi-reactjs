from dotenv import load_dotenv
import os
load_dotenv() # Loads the .env file
ENV = os.environ.get('ENV')
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
MONGO_DB_URL=os.getenv("MONGO_DB_"+ENV.upper()+"_URL")
MONGO_DB_NAME=os.getenv("MONGO_DB_NAME")