from typing import Union
from data.user import UserModel
from data import user as userorm
from fastapi import FastAPI, HTTPException
from configuration import config
from core.encryptation import hash_password
from configuration.db import get_db

config.load()
app = FastAPI()
db_session = get_db()


@app.get("/{user_id}")
async def read_root(user_id: str):
    user = await userorm.get_user(db_session, user_id)
    return user


@app.post("/")
async def create_user(user: UserModel):

    hashed_user = hash_password(user)
    await userorm.create_user(db_session, hashed_user)
    return hashed_user


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=config.get('PORT', int))
