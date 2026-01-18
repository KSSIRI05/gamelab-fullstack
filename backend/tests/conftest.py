import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from main import app
from app.database import get_db, Base

# Utiliser une base de données en mémoire pour les tests
# Cela évite les problèmes de permissions en CI/CD
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False},
    echo=False
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

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
    # Créer les tables de test
    Base.metadata.create_all(bind=engine)
    
    with TestClient(app) as test_client:
        yield test_client
    
    # Nettoyer après chaque test
    Base.metadata.drop_all(bind=engine)

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