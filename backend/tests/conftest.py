import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from main import app
from app.database import get_db, Base

# Utiliser une base de données en mémoire pour les tests
# StaticPool assure que toutes les connexions partagent la même instance en mémoire
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
    echo=False
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Créer toutes les tables une seule fois au démarrage
Base.metadata.create_all(bind=engine)

# Remplacer la dépendance de base de données pour les tests
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="function")
def client():
    # Nettoyer les données avant chaque test
    db = TestingSessionLocal()
    try:
        for table in reversed(Base.metadata.sorted_tables):
            db.execute(table.delete())
        db.commit()
    finally:
        db.close()
    
    with TestClient(app) as test_client:
        yield test_client

@pytest.fixture
def test_user():
    return {
        "name": "Test User",
        "email": "test@example.com", 
        "password": "test123"  # Mot de passe plus court
    }

@pytest.fixture
def test_event():
    return {
        "title": "Test Event",
        "description": "Un événement de test",
        "date": "2024-12-25T10:00:00",
        "location": "INPT Rabat",
        "max_participants": 50,
        "image_url": "https://example.com/image.jpg"
    }