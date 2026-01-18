from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from .user import User
from .event import Event

class RegistrationBase(BaseModel):
    user_id: int
    event_id: int

class RegistrationCreate(BaseModel):
    event_id: int

class Registration(RegistrationBase):
    id: int
    registration_date: datetime
    status: str
    user: Optional[User] = None
    event: Optional[Event] = None
    
    class Config:
        from_attributes = True