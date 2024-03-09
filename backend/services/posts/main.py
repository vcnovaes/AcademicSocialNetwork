from typing import Union
from data.posts import PostsModel
from data import posts as posts_repository
from fastapi import FastAPI, HTTPException
from configuration import config
from configuration.db import get_db

config.load()
app = FastAPI()
db_session = get_db()

@app.get("/{posts_id}")
async def read_root(posts_id: str):
    posts = await posts_repository.get_posts(db_session, posts_id)
    return posts

'''@app.get("/debug")
def debug():
    return user_repository.get_all_users(db_session)'''

@app.post("/new-post")
async def create_posts(posts: PostsModel):
    await posts_repository.create_posts(db_session, posts)
    return posts

@app.put("/update-post")
async def update_posts(posts: PostsModel):
    await posts_repository.update_posts(db_session, posts)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=config.get('PORT', int))
