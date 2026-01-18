# Backend Setup and Installation

## Prerequisites
- Python 3.8 or higher
- pip package manager

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create the database:
```bash
python -c "from app.database import engine; from app.models import user, event, event_registration; from app.models.user import Base; Base.metadata.create_all(bind=engine)"
```

## Running the Server

Start the development server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Alternative Documentation**: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get access token
- `GET /auth/me` - Get current user profile

### Events
- `GET /events/` - Get all events
- `GET /events/{event_id}` - Get specific event
- `POST /events/` - Create new event (requires authentication)
- `POST /events/{event_id}/register` - Register for an event
- `DELETE /events/{event_id}/register` - Unregister from an event
- `GET /events/{event_id}/participants` - Get event participants

## Database Schema

### User
- id (Primary Key)
- email (Unique)
- name
- hashed_password
- created_at

### Event
- id (Primary Key)
- title
- description
- date
- location
- max_participants
- image_url
- created_at

### EventRegistration
- id (Primary Key)
- user_id (Foreign Key)
- event_id (Foreign Key)
- registered_at

## Environment Variables

Create a `.env` file with the following variables:
```
DATABASE_URL=sqlite:///./gamelab.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Frontend Integration

The backend is configured with CORS to allow requests from:
- http://localhost:3000 (Next.js development server)
- http://127.0.0.1:3000

To connect your Next.js frontend, update the API base URL to `http://localhost:8000`