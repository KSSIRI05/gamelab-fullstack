import pytest
from fastapi.testclient import TestClient

class TestAuth:
    """Tests pour les endpoints d'authentification"""
    
    def test_register_user(self, client: TestClient, test_user):
        """Test d'inscription d'un nouvel utilisateur"""
        response = client.post("/api/auth/register", json=test_user)
        
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == test_user["email"]
        assert data["name"] == test_user["name"]
        assert "id" in data
        assert "created_at" in data
        assert "password" not in data  # Le mot de passe ne doit pas être retourné
    
    def test_register_duplicate_email(self, client: TestClient, test_user):
        """Test d'inscription avec un email déjà existant"""
        # Premier utilisateur
        client.post("/api/auth/register", json=test_user)
        
        # Tentative d'inscription avec le même email
        response = client.post("/api/auth/register", json=test_user)
        
        assert response.status_code == 400
        assert "Email already registered" in response.json()["detail"]
    
    def test_register_invalid_email(self, client: TestClient):
        """Test d'inscription avec un email invalide"""
        invalid_user = {
            "name": "Test User",
            "email": "invalid-email",
            "password": "testpassword123"
        }
        
        response = client.post("/api/auth/register", json=invalid_user)
        assert response.status_code == 422  # Validation error
    
    def test_login_valid_credentials(self, client: TestClient, test_user):
        """Test de connexion avec des credentials valides"""
        # Inscription d'abord
        client.post("/api/auth/register", json=test_user)
        
        # Connexion
        login_data = {
            "email": test_user["email"],
            "password": test_user["password"]
        }
        response = client.post("/api/auth/login", json=login_data)
        
        assert response.status_code == 200
        data = response.json()
        assert data["access_token"]
        assert data["token_type"] == "bearer"
        assert data["user"]["email"] == test_user["email"]
        assert data["user"]["name"] == test_user["name"]
    
    def test_login_invalid_credentials(self, client: TestClient, test_user):
        """Test de connexion avec des credentials invalides"""
        login_data = {
            "email": test_user["email"],
            "password": "wrongpassword"
        }
        response = client.post("/api/auth/login", json=login_data)
        
        assert response.status_code == 401
        assert "Incorrect email or password" in response.json()["detail"]
    
    def test_login_nonexistent_user(self, client: TestClient):
        """Test de connexion avec un utilisateur inexistant"""
        login_data = {
            "email": "nonexistent@example.com",
            "password": "somepassword"
        }
        response = client.post("/api/auth/login", json=login_data)
        
        assert response.status_code == 401
        assert "Incorrect email or password" in response.json()["detail"]
    
    def test_token_endpoint(self, client: TestClient, test_user):
        """Test de l'endpoint OAuth2 token"""
        # Inscription d'abord
        client.post("/api/auth/register", json=test_user)
        
        # Connexion via form data (OAuth2)
        token_data = {
            "username": test_user["email"],  # OAuth2 utilise 'username'
            "password": test_user["password"]
        }
        response = client.post("/api/auth/token", data=token_data)
        
        assert response.status_code == 200
        data = response.json()
        assert data["access_token"]
        assert data["token_type"] == "bearer"
        assert data["user"]["email"] == test_user["email"]
    
    def test_get_current_user(self, client: TestClient, test_user):
        """Test de récupération du profil utilisateur connecté"""
        # Inscription et connexion
        client.post("/api/auth/register", json=test_user)
        
        login_response = client.post("/api/auth/login", json={
            "email": test_user["email"],
            "password": test_user["password"]
        })
        token = login_response.json()["access_token"]
        
        # Récupération du profil
        headers = {"Authorization": f"Bearer {token}"}
        response = client.get("/api/auth/me", headers=headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == test_user["email"]
        assert data["name"] == test_user["name"]
        assert "id" in data
        assert "created_at" in data
    
    def test_get_current_user_without_token(self, client: TestClient):
        """Test de récupération du profil sans token"""
        response = client.get("/api/auth/me")
        
        assert response.status_code == 401
    
    def test_get_current_user_invalid_token(self, client: TestClient):
        """Test de récupération du profil avec un token invalide"""
        headers = {"Authorization": "Bearer invalid_token"}
        response = client.get("/api/auth/me", headers=headers)
        
        assert response.status_code == 401