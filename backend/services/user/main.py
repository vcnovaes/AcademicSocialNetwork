from typing import Union
from data.user import LoginModel, UserModel
from data import user as user_repository
from fastapi import FastAPI, HTTPException
from configuration import config
from core.encryptation import hash_password
from core.encryptation import check
from configuration.db import get_db
from fastapi.middleware.cors import CORSMiddleware


config.load()
app = FastAPI()
db_session = get_db()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/pvt/{user_id}")
async def read_root(user_id: str):
    user = await user_repository.get_user(db_session, user_id)
    return user


@app.get("/debug")
def debug():
    return user_repository.get_all_users(db_session)


@app.post("/pub/create")
async def create_user(user: UserModel):
    hashed_user = hash_password(user)
    return await user_repository.create_user(db_session, hashed_user)


@app.post("/login")
async def login(loginData: LoginModel):
    user = await user_repository.get_user_by_email(db_session, loginData.email)
    if user == None:
        raise HTTPException(404)
    correct_password = check(loginData.password, user.password)
    if not correct_password:
        raise HTTPException(403)

    return user


@app.put("/pvt/{user_id}")
async def update_user(user: UserModel, user_id: str):
    user.id = user_id
    user = hash_password(user)
    updated = await user_repository.update_user(db_session, user)
    if updated == None:
        raise HTTPException(404)
    return updated

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=config.get('PORT', int))
