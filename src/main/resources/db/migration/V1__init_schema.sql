CREATE TABLE fournisseur (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    telephone VARCHAR(255),
    email VARCHAR(255),
    adresse VARCHAR(255)
);

CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE utilisateur (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    actif BOOLEAN DEFAULT TRUE,
    role_id BIGINT NOT NULL,
    CONSTRAINT fk_utilisateur_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE produit (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    prix DOUBLE,
    quantite_stock INT,
    seuil_minimum INT,
    fournisseur_id BIGINT NOT NULL,
    CONSTRAINT fk_produit_fournisseur FOREIGN KEY (fournisseur_id) REFERENCES fournisseur(id)
);

CREATE TABLE mouvement_stock (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_mouvement DATETIME(6),
    quantite INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    remarque VARCHAR(255),
    produit_id BIGINT NOT NULL,
    utilisateur_id BIGINT NOT NULL,
    CONSTRAINT fk_mvt_produit FOREIGN KEY (produit_id) REFERENCES produit(id),
    CONSTRAINT fk_mvt_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);

CREATE TABLE alerte_stock (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    message VARCHAR(255),
    date_alerte DATETIME(6),
    etat VARCHAR(50) NOT NULL,
    produit_id BIGINT NOT NULL,
    CONSTRAINT fk_alerte_produit FOREIGN KEY (produit_id) REFERENCES produit(id)
);

INSERT INTO roles (nom) VALUES ('ADMIN'), ('GESTIONNAIRE_STOCK');


INSERT INTO utilisateur (nom, prenom, login, mot_de_passe, email, actif, role_id)
VALUES (
    'Admin', 
    'Super', 
    'admin_stock', 
    'motdepasse123', 
    'admin@gestionstock.com', 
    TRUE, 
    (SELECT id FROM roles WHERE nom = 'ADMIN')
);