from sqlalchemy.orm import Session

from user import UserModel


async def get_user(db: Session, user_id: str):
    return await db.get(UserModel).filter(UserModel.user_id == user_id).first()


async def get_user_by_email(db: Session, email: str):
    return db.query(
        UserModel
    ).filter(UserModel.email == email).first()
