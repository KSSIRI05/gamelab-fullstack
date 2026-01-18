import pytest
from fastapi.testclient import TestClient

class TestMain:
    """Tests pour les endpoints principaux"""
    
    def test_root_endpoint(self, client: TestClient):
        """Test de l'endpoint racine"""
        response = client.get("/")
        
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "GameLab INPT API"
        assert data["status"] == "running"
    
    def test_health_endpoint(self, client: TestClient):
        """Test de l'endpoint de santé"""
        response = client.get("/health")
        
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
    
    def test_invalid_endpoint(self, client: TestClient):
        """Test d'un endpoint inexistant"""
        response = client.get("/nonexistent")
        
        assert response.status_code == 404