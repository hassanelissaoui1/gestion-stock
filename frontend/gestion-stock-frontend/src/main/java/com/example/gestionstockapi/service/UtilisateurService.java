package com.example.gestionstockapi.service;

import com.example.gestionstockapi.model.Utilisateur;

import java.util.List;

public interface UtilisateurService {

    Utilisateur ajouterUtilisateur(Utilisateur utilisateur);

    List<Utilisateur> afficherUtilisateurs();

    Utilisateur afficherUtilisateurParId(Long id);

    Utilisateur modifierUtilisateur(Long id, Utilisateur utilisateur);

    boolean supprimerUtilisateur(Long id);

    Utilisateur attribuerRole(Long utilisateurId, Long roleId);
}
