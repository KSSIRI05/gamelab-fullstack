"""
Initialize database tables
"""
from app.database import engine
from app.models import user, event, event_registration
from app.models.user import Base

def create_tables():
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

if __name__ == "__main__":
    create_tables()