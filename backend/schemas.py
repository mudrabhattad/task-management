from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = ""

class TaskUpdate(TaskCreate):
    is_complete: Optional[bool] = None

class TaskResponse(TaskCreate):
    id: str
    priority: str
    is_complete: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
