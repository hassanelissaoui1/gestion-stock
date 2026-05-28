package com.example.gestionstockapi.controller;

import com.example.gestionstockapi.model.Utilisateur;
import com.example.gestionstockapi.security.SecuriteService;
import com.example.gestionstockapi.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private SecuriteService securiteService;

    @PostMapping("/ajouterUtilisateur")
    public ResponseEntity<?> ajouterUtilisateur(
            @RequestBody Utilisateur utilisateur,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(utilisateurService.ajouterUtilisateur(utilisateur));
    }

    @GetMapping("/afficherUtilisateurs")
    public ResponseEntity<?> afficherUtilisateurs(
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(utilisateurService.afficherUtilisateurs());
    }

    @GetMapping("/afficherUtilisateurParId/{id}")
    public ResponseEntity<?> afficherUtilisateurParId(
            @PathVariable Long id,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(utilisateurService.afficherUtilisateurParId(id));
    }

    @PutMapping("/modifierUtilisateur/{id}")
    public ResponseEntity<?> modifierUtilisateur(
            @PathVariable Long id,
            @RequestBody Utilisateur utilisateur,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(utilisateurService.modifierUtilisateur(id, utilisateur));
    }

    @DeleteMapping("/supprimerUtilisateur/{id}")
    public ResponseEntity<?> supprimerUtilisateur(
            @PathVariable Long id,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(utilisateurService.supprimerUtilisateur(id));
    }

    @PutMapping("/attribuerRole/{utilisateurId}/{roleId}")
    public ResponseEntity<?> attribuerRole(
            @PathVariable Long utilisateurId,
            @PathVariable Long roleId,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurConnecteId
    ) {
        if (!securiteService.estAdmin(utilisateurConnecteId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(utilisateurService.attribuerRole(utilisateurId, roleId));
    }
}
