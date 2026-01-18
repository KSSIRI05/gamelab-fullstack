#!/usr/bin/env python3
"""
Script pour recréer la base de données avec le nouveau schéma.
Supprime l'ancienne base et la recrée avec le modèle actuel.
"""

import os
import sys

# Ajouter le répertoire parent au PATH pour les imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import engine, Base
from app.models import User, Event, EventRegistration  # Importer les modèles pour qu'ils soient enregistrés

def reset_database():
    """Recrée la base de données avec le schéma actuel."""
    
    # Chemin vers le fichier de base de données
    db_file = "gamelab.db"
    
    # Supprimer l'ancien fichier s'il existe
    if os.path.exists(db_file):
        os.remove(db_file)
        print(f"✅ Ancien fichier {db_file} supprimé")
    else:
        print(f"ℹ️ Fichier {db_file} n'existe pas")
    
    # Recréer les tables avec le nouveau schéma
    Base.metadata.create_all(bind=engine)
    print("✅ Base de données recréée avec le nouveau schéma")
    print("✅ Le modèle User utilise maintenant la colonne 'name' au lieu de 'nom' et 'prenom'")
    print("✅ Vous pouvez maintenant redémarrer le serveur FastAPI")

if __name__ == "__main__":
    try:
        reset_database()
    except Exception as e:
        print(f"❌ Erreur: {e}")
        sys.exit(1)