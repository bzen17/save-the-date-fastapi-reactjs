from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as AuthRouter
from routes.user import router as UserRouter
from routes.event import router as EventRouter

app = FastAPI()
app.include_router(AuthRouter, tags=["Auth"], prefix="/auth")
app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(EventRouter, tags=["Event"], prefix="/event")

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your birthday calender."}