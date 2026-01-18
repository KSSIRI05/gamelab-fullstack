# Tests pour l'API GameLab INPT

Ce répertoire contient tous les tests pour l'API Backend de GameLab INPT.

## Structure des Tests

- **conftest.py** : Configuration globale des tests, fixtures communes
- **test_auth.py** : Tests pour l'authentification (inscription, connexion, profil)
- **test_events.py** : Tests pour les événements (CRUD, inscriptions)
- **test_main.py** : Tests pour les endpoints principaux

## Exécution des Tests

### Installation des dépendances de test
```bash
pip install -r requirements.txt
```

### Lancer tous les tests
```bash
pytest
```

### Lancer les tests avec plus de détails
```bash
pytest -v
```

### Lancer les tests d'un module specific
```bash
# Tests d'authentification uniquement
pytest tests/test_auth.py

# Tests d'événements uniquement  
pytest tests/test_events.py
```

### Lancer un test spécifique
```bash
pytest tests/test_auth.py::TestAuth::test_register_user
```

### Générer un rapport de couverture
```bash
pip install coverage
coverage run -m pytest
coverage report
coverage html  # Génère un rapport HTML dans htmlcov/
```

## Fixtures Disponibles

- **client** : Client de test FastAPI configuré avec une base de données temporaire
- **test_user** : Utilisateur de test avec des données valides
- **test_event** : Événement de test avec des données valides

## Types de Tests

### Tests d'Authentification
- ✅ Inscription utilisateur valide
- ✅ Inscription avec email dupliqué
- ✅ Inscription avec données invalides
- ✅ Connexion avec credentials valides
- ✅ Connexion avec credentials invalides
- ✅ Récupération du profil utilisateur
- ✅ Gestion des tokens JWT

### Tests d'Événements
- ✅ Création d'événements
- ✅ Récupération de la liste des événements
- ✅ Récupération d'un événement par ID
- ✅ Inscription à un événement
- ✅ Désinscription d'un événement
- ✅ Gestion des événements complets
- ✅ Récupération des participants
- ✅ Protection par authentification

### Tests Généraux
- ✅ Endpoints de base (/, /health)
- ✅ Gestion des erreurs 404
- ✅ Configuration CORS

## Configuration de la Base de Données de Test

Les tests utilisent une base de données SQLite temporaire (`test.db`) qui est :
- Créée avant chaque session de test
- Supprimée après chaque session de test
- Isolée de la base de données de développement

## Bonnes Pratiques

1. **Isolation** : Chaque test est indépendant
2. **Nettoyage** : Les données de test sont nettoyées automatiquement
3. **Fixtures** : Utilisation de fixtures pour les données communes
4. **Assertions** : Tests complets avec vérification des codes de statut et du contenu
5. **Documentation** : Chaque test a une description claire