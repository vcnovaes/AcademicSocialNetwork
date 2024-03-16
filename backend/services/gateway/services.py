from pydantic import BaseModel

services_map: dict[str, str] = {
    'users': 'http://user-service:8001',
    'auth': 'http://auth-service:8084'
}


class NewPostModel(BaseModel):
    owner: str = ''
    text: str
