package com.example.gestionstockapi.service;

import com.example.gestionstockapi.model.Role;
import com.example.gestionstockapi.model.Utilisateur;
import com.example.gestionstockapi.repository.RoleRepository;
import com.example.gestionstockapi.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Utilisateur ajouterUtilisateur(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    @Override
    public List<Utilisateur> afficherUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @Override
    public Utilisateur afficherUtilisateurParId(Long id) {
        return utilisateurRepository.findById(id).orElse(null);
    }

    @Override
    public Utilisateur modifierUtilisateur(Long id, Utilisateur utilisateur) {
        Utilisateur currentUtilisateur = utilisateurRepository.findById(id).orElse(null);

        if (currentUtilisateur != null) {
            currentUtilisateur.setNom(utilisateur.getNom());
            currentUtilisateur.setPrenom(utilisateur.getPrenom());
            currentUtilisateur.setLogin(utilisateur.getLogin());
            currentUtilisateur.setMotDePasse(utilisateur.getMotDePasse());
            currentUtilisateur.setEmail(utilisateur.getEmail());
            currentUtilisateur.setActif(utilisateur.getActif());
            currentUtilisateur.setRole(utilisateur.getRole());

            return utilisateurRepository.save(currentUtilisateur);
        }

        return null;
    }

    @Override
    public boolean supprimerUtilisateur(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id).orElse(null);

        if (utilisateur != null) {
            utilisateurRepository.delete(utilisateur);
            return true;
        }

        return false;
    }

    @Override
    public Utilisateur attribuerRole(Long utilisateurId, Long roleId) {
        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId).orElse(null);
        Role role = roleRepository.findById(roleId).orElse(null);

        if (utilisateur != null && role != null) {
            utilisateur.setRole(role);
            return utilisateurRepository.save(utilisateur);
        }

        return null;
    }
}
