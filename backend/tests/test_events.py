import pytest
from fastapi.testclient import TestClient

class TestEvents:
    """Tests pour les endpoints d'événements"""
    
    def get_auth_headers(self, client: TestClient, user_data):
        """Helper pour obtenir les headers d'authentification"""
        # Inscription et connexion
        client.post("/api/auth/register", json=user_data)
        login_response = client.post("/api/auth/login", json={
            "email": user_data["email"],
            "password": user_data["password"]
        })
        token = login_response.json()["access_token"]
        return {"Authorization": f"Bearer {token}"}
    
    def test_get_events_empty(self, client: TestClient):
        """Test de récupération des événements quand il n'y en a aucun"""
        response = client.get("/api/events/")
        
        assert response.status_code == 200
        assert response.json() == []
    
    def test_create_event(self, client: TestClient, test_user, test_event):
        """Test de création d'un événement"""
        headers = self.get_auth_headers(client, test_user)
        
        response = client.post("/api/events/", json=test_event, headers=headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == test_event["title"]
        assert data["description"] == test_event["description"]
        assert data["location"] == test_event["location"]
        assert data["max_participants"] == test_event["max_participants"]
        assert data["current_participants"] == 0
        assert "id" in data
        assert "created_at" in data
    
    def test_create_event_without_auth(self, client: TestClient, test_event):
        """Test de création d'événement sans authentification"""
        response = client.post("/api/events/", json=test_event)
        
        assert response.status_code == 401
    
    def test_create_event_invalid_data(self, client: TestClient, test_user):
        """Test de création d'événement avec des données invalides"""
        headers = self.get_auth_headers(client, test_user)
        
        invalid_event = {
            "title": "",  # Titre vide
            "date": "invalid-date"  # Date invalide
        }
        
        response = client.post("/api/events/", json=invalid_event, headers=headers)
        
        assert response.status_code == 422  # Validation error
    
    def test_get_events_with_data(self, client: TestClient, test_user, test_event):
        """Test de récupération des événements avec des données"""
        headers = self.get_auth_headers(client, test_user)
        
        # Créer un événement
        create_response = client.post("/api/events/", json=test_event, headers=headers)
        created_event = create_response.json()
        
        # Récupérer tous les événements
        response = client.get("/api/events/")
        
        assert response.status_code == 200
        events = response.json()
        assert len(events) == 1
        assert events[0]["id"] == created_event["id"]
        assert events[0]["title"] == test_event["title"]
    
    def test_get_event_by_id(self, client: TestClient, test_user, test_event):
        """Test de récupération d'un événement par ID"""
        headers = self.get_auth_headers(client, test_user)
        
        # Créer un événement
        create_response = client.post("/api/events/", json=test_event, headers=headers)
        event_id = create_response.json()["id"]
        
        # Récupérer l'événement par ID
        response = client.get(f"/api/events/{event_id}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == event_id
        assert data["title"] == test_event["title"]
    
    def test_get_nonexistent_event(self, client: TestClient):
        """Test de récupération d'un événement inexistant"""
        response = client.get("/api/events/999")
        
        assert response.status_code == 404
        assert "Event not found" in response.json()["detail"]
    
    def test_register_for_event(self, client: TestClient, test_user, test_event):
        """Test d'inscription à un événement"""
        headers = self.get_auth_headers(client, test_user)
        
        # Créer un événement
        create_response = client.post("/api/events/", json=test_event, headers=headers)
        event_id = create_response.json()["id"]
        
        # S'inscrire à l'événement
        response = client.post(f"/api/events/{event_id}/register", headers=headers)
        
        assert response.status_code == 200
        assert "Successfully registered for event" in response.json()["message"]
        
        # Vérifier que le compteur de participants a augmenté
        event_response = client.get(f"/api/events/{event_id}")
        assert event_response.json()["current_participants"] == 1
    
    def test_register_twice_same_event(self, client: TestClient, test_user, test_event):
        """Test d'inscription deux fois au même événement"""
        headers = self.get_auth_headers(client, test_user)
        
        # Créer un événement
        create_response = client.post("/api/events/", json=test_event, headers=headers)
        event_id = create_response.json()["id"]
        
        # S'inscrire une première fois
        client.post(f"/api/events/{event_id}/register", headers=headers)
        
        # Essayer de s'inscrire une deuxième fois
        response = client.post(f"/api/events/{event_id}/register", headers=headers)
        
        assert response.status_code == 400
        assert "Already registered for this event" in response.json()["detail"]
    
    def test_register_event_full(self, client: TestClient, test_user):
        """Test d'inscription à un événement complet"""
        # Créer un événement avec 1 place maximum
        limited_event = {
            "title": "Event complet",
            "description": "Événement avec une seule place",
            "date": "2024-12-25T10:00:00",
            "location": "INPT",
            "max_participants": 1
        }
        
        # Premier utilisateur
        headers1 = self.get_auth_headers(client, test_user)
        create_response = client.post("/api/events/", json=limited_event, headers=headers1)
        event_id = create_response.json()["id"]
        
        # Premier utilisateur s'inscrit
        client.post(f"/api/events/{event_id}/register", headers=headers1)
        
        # Deuxième utilisateur
        user2 = {
            "name": "User 2", 
            "email": "user2@example.com", 
            "password": "pass123"
        }
        headers2 = self.get_auth_headers(client, user2)
        
        # Deuxième utilisateur essaie de s'inscrire
        response = client.post(f"/api/events/{event_id}/register", headers=headers2)
        
        assert response.status_code == 400
        assert "Event is full" in response.json()["detail"]
    
    def test_unregister_from_event(self, client: TestClient, test_user, test_event):
        """Test de désinscription d'un événement"""
        headers = self.get_auth_headers(client, test_user)
        
        # Créer et s'inscrire à un événement
        create_response = client.post("/api/events/", json=test_event, headers=headers)
        event_id = create_response.json()["id"]
        client.post(f"/api/events/{event_id}/register", headers=headers)
        
        # Se désinscrire
        response = client.delete(f"/api/events/{event_id}/register", headers=headers)
        
        assert response.status_code == 200
        assert "Successfully unregistered from event" in response.json()["message"]
        
        # Vérifier que le compteur de participants a diminué
        event_response = client.get(f"/api/events/{event_id}")
        assert event_response.json()["current_participants"] == 0
    
    def test_unregister_not_registered(self, client: TestClient, test_user, test_event):
        """Test de désinscription d'un événement non inscrit"""
        headers = self.get_auth_headers(client, test_user)
        
        # Créer un événement sans s'y inscrire
        create_response = client.post("/api/events/", json=test_event, headers=headers)
        event_id = create_response.json()["id"]
        
        # Essayer de se désinscrire
        response = client.delete(f"/api/events/{event_id}/register", headers=headers)
        
        assert response.status_code == 404
        assert "Registration not found" in response.json()["detail"]
    
    def test_get_event_participants(self, client: TestClient, test_user, test_event):
        """Test de récupération des participants d'un événement"""
        headers = self.get_auth_headers(client, test_user)
        
        # Créer et s'inscrire à un événement
        create_response = client.post("/api/events/", json=test_event, headers=headers)
        event_id = create_response.json()["id"]
        client.post(f"/api/events/{event_id}/register", headers=headers)
        
        # Récupérer les participants
        response = client.get(f"/api/events/{event_id}/participants")
        
        assert response.status_code == 200
        participants = response.json()
        assert len(participants) == 1
        assert participants[0]["email"] == test_user["email"]
        assert participants[0]["name"] == test_user["name"]
        assert "registered_at" in participants[0]
    
    def test_register_without_auth(self, client: TestClient, test_user, test_event):
        """Test d'inscription à un événement sans authentification"""
        headers = self.get_auth_headers(client, test_user)
        
        # Créer un événement
        create_response = client.post("/api/events/", json=test_event, headers=headers)
        event_id = create_response.json()["id"]
        
        # Essayer de s'inscrire sans headers d'auth
        response = client.post(f"/api/events/{event_id}/register")
        
        assert response.status_code == 401