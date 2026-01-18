from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime, timezone

class Event(Base):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    date = Column(DateTime, nullable=False)
    location = Column(String(255))
    max_participants = Column(Integer)
    image_url = Column(String(500))
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    # Relations
    registrations = relationship("EventRegistration", back_populates="event")