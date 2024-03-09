from bcrypt import checkpw, hashpw, gensalt
from data.user import UserModel


def encrypt(input: str) -> str:
    return hashpw(str.encode(input), gensalt()).decode()


def check(input: str, hashed_input: str) -> bool:
    return checkpw(input.encode(), hashed_input.encode())


def hash_password(user: UserModel):
    user.password = encrypt(user.password)
    return user
