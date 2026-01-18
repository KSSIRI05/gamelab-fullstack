from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.event import EventCreate, EventResponse
from app.models.event import Event
from app.models.user import User
from app.models.event_registration import EventRegistration
from app.utils.auth import get_current_user
from datetime import datetime

router = APIRouter(tags=["events"])

@router.get("/", response_model=List[EventResponse])
async def get_events(db: Session = Depends(get_db)):
    events = db.query(Event).all()
    return events

@router.get("/{event_id}", response_model=EventResponse)
async def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    return event

@router.post("/", response_model=EventResponse)
async def create_event(
    event: EventCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_event = Event(
        title=event.title,
        description=event.description,
        date=event.date,
        location=event.location,
        max_participants=event.max_participants,
        image_url=event.image_url
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    
    return db_event

@router.post("/{event_id}/register")
async def register_for_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if event exists
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Check if user is already registered
    existing_registration = db.query(EventRegistration).filter(
        EventRegistration.event_id == event_id,
        EventRegistration.user_id == current_user.id
    ).first()
    
    if existing_registration:
        raise HTTPException(status_code=400, detail="Already registered for this event")
    
    # Check if event is full
    current_registrations = db.query(EventRegistration).filter(
        EventRegistration.event_id == event_id
    ).count()
    
    if current_registrations >= event.max_participants:
        raise HTTPException(status_code=400, detail="Event is full")
    
    # Register user for event
    registration = EventRegistration(
        user_id=current_user.id,
        event_id=event_id
    )
    db.add(registration)
    db.commit()
    
    return {"message": "Successfully registered for event"}

@router.delete("/{event_id}/register")
async def unregister_from_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Find registration
    registration = db.query(EventRegistration).filter(
        EventRegistration.event_id == event_id,
        EventRegistration.user_id == current_user.id
    ).first()
    
    if not registration:
        raise HTTPException(status_code=404, detail="Registration not found")
    
    db.delete(registration)
    db.commit()
    
    return {"message": "Successfully unregistered from event"}

@router.get("/{event_id}/participants", response_model=List[dict])
async def get_event_participants(
    event_id: int,
    db: Session = Depends(get_db)
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    participants = []
    for registration in event.registrations:
        participants.append({
            "id": registration.user.id,
            "name": registration.user.name,
            "email": registration.user.email,
            "registered_at": registration.registered_at
        })
    
    return participants

@router.get("/registrations")
async def get_user_registrations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all event registrations for the current user"""
    registrations = db.query(EventRegistration).filter(
        EventRegistration.user_id == current_user.id
    ).all()
    
    return [
        {
            "id": reg.id,
            "user_id": reg.user_id,
            "event_id": reg.event_id,
            "registered_at": reg.registered_at
        }
        for reg in registrations
    ]