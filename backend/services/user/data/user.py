from pydantic import BaseModel, validator
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import Session
from typing import Optional
from uuid import uuid4
from configuration.db import Base


class UserORM(Base):
    __tablename__ = 'users'
    id = Column(String, primary_key=True, nullable=False,
                default=lambda: str(uuid4()))
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)  # Fixed typo here
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)


class UserModel(BaseModel):
    first_name: str
    last_name: str
    id: Optional[str]
    email: str
    password: str  # Fixed typo here

    @validator("id", pre=True, always=True)
    def default_id(cls, v):
        return v or str(uuid4())

    def orm(self): return UserORM(
        id=self.id,
        first_name=self.first_name,
        email=self.email,
        password=self.password,
        last_name=self.last_name
    )


async def create_user(db_session: Session, user: UserModel) -> UserORM:
    db_session.add(user.orm())
    db_session.commit()
    await db_session.refresh(user.orm())


async def get_user(db_session: Session, id: str) -> UserORM:
    query = db_session.query(UserORM).filter(UserORM.id == id)
    return db_session.execute(query).scalars().first()


engine = create_engine("sqlite:///test.db")
Base.metadata.create_all(engine)
