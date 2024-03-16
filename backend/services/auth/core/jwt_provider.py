from jwt import encode, decode
from pydantic import BaseModel

from datetime import datetime, timedelta


class JwtPayload(BaseModel):
    sub: str  # email
    exp: datetime
    iat: datetime


class JwtProvider:
    def __init__(self, ttl_in_minutes: int, secret_key: str, algorithm: str = 'HS256') -> None:
        self.expiration: timedelta = timedelta(minutes=ttl_in_minutes)
        self.key: str = secret_key
        self.algorithm: str = algorithm

    def __build_jwt_payload(self, email: str) -> JwtPayload:
        creation_time = datetime.utcnow()

        return JwtPayload(
            sub=email,
            exp=creation_time + self.expiration,
            iat=creation_time
        )

    def generate(self, email: str):
        return encode(
            self.__build_jwt_payload(email).model_dump(),
            self.key,
            self.algorithm
        )

    def decode(self, jwt_encoded: str) -> JwtPayload:
        return decode(
            jwt_encoded,
            self.key,
            self.algorithm
        )
