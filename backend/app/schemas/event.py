from pydantic import BaseModel, ConfigDict, computed_field
from datetime import datetime
from typing import Optional, List

class EventRegistrationResponse(BaseModel):
    id: int
    user_id: int
    event_id: int
    registered_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    date: datetime
    location: Optional[str] = None
    max_participants: Optional[int] = None
    image_url: Optional[str] = None

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int
    created_at: datetime
    registrations: Optional[List[EventRegistrationResponse]] = None
    
    @computed_field
    @property
    def current_participants(self) -> int:
        if self.registrations:
            return len(self.registrations)
        return 0
    
    model_config = ConfigDict(from_attributes=True)

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    location: Optional[str] = None
    max_participants: Optional[int] = None
    image_url: Optional[str] = None

class Event(EventBase):
    id: int
    created_at: datetime
    registrations: Optional[List[EventRegistrationResponse]] = None
    
    @computed_field
    @property
    def current_participants(self) -> int:
        if self.registrations:
            return len(self.registrations)
        return 0
    
    model_config = ConfigDict(from_attributes=True)
    
    model_config = ConfigDict(from_attributes=True)