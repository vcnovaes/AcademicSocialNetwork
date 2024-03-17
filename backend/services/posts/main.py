from typing import Union
from data.posts import PostsModel
from data import posts as posts_repository
from fastapi import FastAPI, HTTPException
from configuration import config
from configuration.db import get_db
from fastapi.middleware.cors import CORSMiddleware

config.load()
app = FastAPI()


origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


db_session = get_db()


@app.get("/pvt/post/{posts_id}")
async def get_posts_by_id(posts_id: str):
    posts = await posts_repository.get_posts(db_session, posts_id)
    if posts == None:
        return HTTPException(404, detail="post not found")
    return posts


@app.get("/pvt/profile/{owner}")
async def get_posts_by_owner(owner: str):
    posts = posts_repository.get_all_posts_by_owner(db_session, owner)
    return posts


@app.post("/pvt/new-post")
async def create_posts(posts: PostsModel):
    return await posts_repository.create_posts(db_session, posts)


@app.delete("/pvt/delete-posts/{post_id}")
async def delete_post(post_id: str):
    await posts_repository.delete_post_by_id(db_session, post_id)
    return None


@app.put("/pvt/update-post")
async def update_posts(posts: PostsModel):
    await posts_repository.update_posts(db_session, posts)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=config.get('PORT', int))
