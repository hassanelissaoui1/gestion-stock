package com.example.gestionstockapi.controller;

import com.example.gestionstockapi.model.Utilisateur;
import com.example.gestionstockapi.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/ajouterUtilisateur")
    public Utilisateur ajouterUtilisateur(@RequestBody Utilisateur utilisateur) {
        return utilisateurService.ajouterUtilisateur(utilisateur);
    }

    @GetMapping("/afficherUtilisateurs")
    public List<Utilisateur> afficherUtilisateurs() {
        return utilisateurService.afficherUtilisateurs();
    }

    @GetMapping("/afficherUtilisateurParId/{id}")
    public Utilisateur afficherUtilisateurParId(@PathVariable Long id) {
        return utilisateurService.afficherUtilisateurParId(id);
    }

    @PutMapping("/modifierUtilisateur/{id}")
    public Utilisateur modifierUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {
        return utilisateurService.modifierUtilisateur(id, utilisateur);
    }

    @DeleteMapping("/supprimerUtilisateur/{id}")
    public boolean supprimerUtilisateur(@PathVariable Long id) {
        return utilisateurService.supprimerUtilisateur(id);
    }

    @PutMapping("/attribuerRole/{utilisateurId}/{roleId}")
    public Utilisateur attribuerRole(@PathVariable Long utilisateurId, @PathVariable Long roleId) {
        return utilisateurService.attribuerRole(utilisateurId, roleId);
    }
}
