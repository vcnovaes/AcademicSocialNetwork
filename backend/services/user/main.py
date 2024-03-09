from typing import Union
from data.user import LoginModel, UserModel
from data import user as user_repository
from fastapi import FastAPI, HTTPException
from configuration import config
from core.encryptation import hash_password
from core.encryptation import check
from configuration.db import get_db

config.load()
app = FastAPI()
db_session = get_db()


@app.get("/{user_id}")
async def read_root(user_id: str):
    user = await user_repository.get_user(db_session, user_id)
    return user


@app.get("/debug")
def debug():
    return user_repository.get_all_users(db_session)


@app.post("/")
async def create_user(user: UserModel):
    hashed_user = hash_password(user)
    await user_repository.create_user(db_session, hashed_user)
    return hashed_user


@app.post("/login")
async def login(loginData: LoginModel):
    user = await user_repository.get_user_by_email(db_session, loginData.email)
    if user == None:
        return HTTPException(404)
    correct_password = check(loginData.password, user.password)
    if not correct_password:
        return HTTPException(403)


@app.put("/")
async def update_user(user: UserModel):
    await user_repository.update_user(db_session, user)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=config.get('PORT', int))
