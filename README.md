# Système de gestion de stock

Ce projet consiste à développer une application web de gestion de stock.

## Technologies utilisées

- Backend : Spring Boot
- Frontend : React
- Base de données : MySQL
- Migration DB : Flyway
- API : REST

## Fonctionnalités principales

- Authentification avec rôles
- Gestion des produits
- Gestion des fournisseurs
- Suivi des entrées et sorties de stock
- Alertes de stock faible
- Statistiques
## Migration de la base de données

Le projet utilise **Flyway** pour gérer la migration de la base de données.

Au démarrage de l'application, Flyway exécute automatiquement le fichier :

```text
src/main/resources/db/migration/V1__init_schema.sql
```

Cette migration permet de :

- créer les tables de la base de données ;
- créer les rôles `ADMIN` et `GESTIONNAIRE_STOCK` ;
- créer un utilisateur administrateur par défaut.

Identifiants de l'administrateur par défaut :

```text
Login : admin_stock
Mot de passe : motdepasse123
```

Grâce à cette migration, une personne qui clone le projet peut lancer l'application et utiliser directement un compte administrateur pour tester le système.
