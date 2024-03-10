from pydantic import BaseModel

class SchedulerModel(BaseModel):
    date_time: str
    route: str
    payload: str
    action: str