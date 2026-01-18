from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class RegistrationBase(BaseModel):
    user_id: int
    event_id: int

class RegistrationCreate(BaseModel):
    event_id: int

class Registration(RegistrationBase):
    id: int
    registered_at: datetime
    
    model_config = ConfigDict(from_attributes=True)