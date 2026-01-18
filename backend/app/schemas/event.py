from pydantic import BaseModel, ConfigDict, computed_field
from datetime import datetime
from typing import Optional, List

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
    
    @computed_field
    @property
    def current_participants(self) -> int:
        # Accéder à la relation registrations depuis le modèle ORM
        if hasattr(self, 'registrations'):
            return len(self.registrations) if self.registrations else 0
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
    
    @computed_field
    @property
    def current_participants(self) -> int:
        # Accéder à la relation registrations depuis le modèle ORM
        if hasattr(self, 'registrations'):
            return len(self.registrations) if self.registrations else 0
        return 0
    
    model_config = ConfigDict(from_attributes=True)
    
    model_config = ConfigDict(from_attributes=True)