from fastapi import HTTPException
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


class LoginModel(BaseModel):
    email: str
    password: str


class UserModel(BaseModel):
    first_name: str
    last_name: str
    id: Optional[str] = None
    email: str
    password: str  # Fixed typo here

    # @validator("id", pre=True, always=True)
    # def default_id(cls, v):
    #     return v or str(uuid4())

    def orm(self): return UserORM(
        id=self.id,
        first_name=self.first_name,
        email=self.email,
        password=self.password,
        last_name=self.last_name
    )


async def create_user(db_session: Session, user: UserModel) -> UserORM:
    user.id = str(uuid4())
    try:
        db_session.add(user.orm())
        db_session.commit()
    except Exception as err:
        db_session.rollback()
        print(err)
        raise HTTPException(400, "Not valid")
    return user


async def get_user_by_email(db_session: Session, email: str):
    query = db_session.query(UserORM).filter(UserORM.email == email)
    return db_session.execute(query).scalars().first()


async def get_user(db_session: Session, id: str) -> UserORM:
    query = db_session.query(UserORM).filter(UserORM.id == id)
    return db_session.execute(query).scalars().first()


def get_all_users(db_session: Session) -> list[UserORM]:
    """Retrieves all users from the database.

    Args:
        db_session: The SQLAlchemy session object.

    Returns:
        A list of UserORM objects representing all users.
    """
    query = db_session.query(UserORM)
    users = query.all()
    return users


async def update_user(db_session: Session, user: UserModel):
    try:
        query = db_session.query(UserORM).filter(
            UserORM.id == user.id
        ).update({UserORM.email: user.email,
                  UserORM.first_name: user.first_name,
                  UserORM.last_name: user.last_name,
                  UserORM.password: user.password
                  })
        db_session.commit()
        return await get_user(db_session, user.id)

    except:
        db_session.rollback()
        raise HTTPException(400)
engine = create_engine("sqlite:///test.db")
Base.metadata.create_all(engine)
