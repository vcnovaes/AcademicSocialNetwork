import dotenv as env
from os import getenv


def load():
    env.load_dotenv()


def get(var: str, conv: None) -> str:
    return conv(getenv(var))
