import json
from pydantic import BaseModel, validator
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import Session
from typing import Optional
from uuid import uuid4
from configuration.db import Base
from fastapi import FastAPI, HTTPException


class PostsORM(Base):
    __tablename__ = 'posts'
    id = Column(String, primary_key=True, nullable=False,
                default=lambda: str(uuid4()))
    owner = Column(String, nullable=False)
    text = Column(String, nullable=False)


class PostsModel(BaseModel):
    id: Optional[str] = None
    owner: str
    text: str

    def orm(self): return PostsORM(
        id=self.id,
        owner=self.owner,
        text=self.text
    )


async def create_posts(db_session: Session, posts: PostsModel) -> PostsORM:
    posts.id = str(uuid4())
    db_session.add(posts.orm())
    db_session.commit()
    return posts


async def delete_post_by_id(db_session: Session, post_id: int) -> None:
    post = db_session.query(PostsORM).filter(PostsORM.id == post_id).delete()
    db_session.commit()


async def get_posts(db_session: Session, id: str) -> PostsORM:
    query = db_session.query(PostsORM).filter(PostsORM.id == id)
    return db_session.execute(query).scalars().first()


def get_all_posts_by_owner(db_session: Session, owner: str) -> list[PostsORM]:
    posts = db_session.query(PostsORM).filter(PostsORM.owner == owner).all()

    parsed_posts = [PostsModel(
        id=post.id, text=post.text, owner=post.owner) for post in posts]

    return parsed_posts


async def update_posts(db_session: Session, posts: PostsModel):
    query = db_session.query(PostsORM).filter(
        PostsORM.id == posts.id
    ).update({PostsORM.text: posts.text,
              })
    db_session.commit()

engine = create_engine("sqlite:///test.db")
Base.metadata.create_all(engine)
