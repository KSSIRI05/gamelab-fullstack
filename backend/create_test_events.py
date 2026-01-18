#!/usr/bin/env python3
"""
Script pour ajouter des événements de test dans la base de données.
"""

import sys
import os
from datetime import datetime, timezone, timedelta

# Ajouter le répertoire parent au PATH pour les imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models import Event

def create_test_events():
    """Crée des événements de test."""
    
    db = SessionLocal()
    
    try:
        # Vérifier si des événements existent déjà
        existing_events = db.query(Event).count()
        if existing_events > 0:
            print(f"ℹ️ {existing_events} événement(s) existe(nt) déjà dans la base.")
            return
        
        # Créer des événements de test
        events_data = [
            {
                "title": "🏆 Bizu Cup 2026",
                "description": "Tournoi e-sport majeur avec des équipes de toute la région INPT",
                "date": datetime.now(timezone.utc) + timedelta(days=30),
                "location": "Amphithéâtre INPT",
                "max_participants": 50
            },
            {
                "title": "🔥 Olympiades INPT",
                "description": "Compétition inter-écoles avec plusieurs jeux vidéo",
                "date": datetime.now(timezone.utc) + timedelta(days=60),
                "location": "Campus INPT",
                "max_participants": 100
            },
            {
                "title": "🎮 GameNight Hebdomadaire",
                "description": "Soirées gaming détente pour tous les membres du club",
                "date": datetime.now(timezone.utc) + timedelta(days=7),
                "location": "Salle informatique",
                "max_participants": 30
            },
            {
                "title": "🚀 GameDev Workshop",
                "description": "Atelier de développement de jeux avec Unity",
                "date": datetime.now(timezone.utc) - timedelta(days=10),  # Événement passé
                "location": "Laboratoire INPT",
                "max_participants": 25
            }
        ]
        
        created_events = []
        for event_data in events_data:
            event = Event(**event_data)
            db.add(event)
            created_events.append(event_data["title"])
        
        db.commit()
        
        print("✅ Événements créés avec succès :")
        for title in created_events:
            print(f"   - {title}")
        
        print(f"\n📊 Total: {len(created_events)} événements ajoutés")
        print("✅ Vous pouvez maintenant tester l'inscription aux événements !")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Erreur lors de la création des événements: {e}")
        sys.exit(1)
    finally:
        db.close()

if __name__ == "__main__":
    create_test_events()