package com.example.gestionstockapi.security;

import com.example.gestionstockapi.model.Utilisateur;
import com.example.gestionstockapi.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SecuriteService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Utilisateur getUtilisateurConnecte(Long utilisateurId) {
        if (utilisateurId == null) {
            return null;
        }

        return utilisateurRepository.findById(utilisateurId).orElse(null);
    }

    public boolean estAdmin(Long utilisateurId) {
        Utilisateur utilisateur = getUtilisateurConnecte(utilisateurId);

        if (utilisateur == null) {
            return false;
        }

        if (utilisateur.getRole() == null) {
            return false;
        }

        if (utilisateur.getRole().getNom() == null) {
            return false;
        }

        if (utilisateur.getRole().getNom().name().equals("ADMIN")) {
            return true;
        }

        return false;
    }

    public boolean estGestionnaireStock(Long utilisateurId) {
        Utilisateur utilisateur = getUtilisateurConnecte(utilisateurId);

        if (utilisateur == null) {
            return false;
        }

        if (utilisateur.getRole() == null) {
            return false;
        }

        if (utilisateur.getRole().getNom() == null) {
            return false;
        }

        if (utilisateur.getRole().getNom().name().equals("GESTIONNAIRE_STOCK")) {
            return true;
        }

        return false;
    }

    public boolean estAdminOuGestionnaireStock(Long utilisateurId) {
        if (estAdmin(utilisateurId)) {
            return true;
        }

        if (estGestionnaireStock(utilisateurId)) {
            return true;
        }

        return false;
    }
}
