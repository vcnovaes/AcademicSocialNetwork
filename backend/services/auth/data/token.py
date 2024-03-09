from pydantic import BaseModel


class JwtToken(BaseModel):
    token: str
