from pydantic import BaseModel

class SchedularModel(BaseModel):
    date_time: str
    route: str
    payload: str
    action: str