package com.example.gestionstockapi.controller;

import com.example.gestionstockapi.model.Fournisseur;
import com.example.gestionstockapi.security.SecuriteService;
import com.example.gestionstockapi.service.FournisseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fournisseurs")
public class FournisseurController {

    @Autowired
    private FournisseurService fournisseurService;

    @Autowired
    private SecuriteService securiteService;

    @PostMapping("/ajouterFournisseur")
    public ResponseEntity<?> ajouterFournisseur(
            @RequestBody Fournisseur fournisseur,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(fournisseurService.ajouterFournisseur(fournisseur));
    }

    @GetMapping("/afficherFournisseurs")
    public ResponseEntity<?> afficherFournisseurs(
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdminOuGestionnaireStock(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(fournisseurService.afficherFournisseurs());
    }

    @GetMapping("/afficherFournisseurParId/{id}")
    public ResponseEntity<?> afficherFournisseurParId(
            @PathVariable Long id,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdminOuGestionnaireStock(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(fournisseurService.afficherFournisseurParId(id));
    }

    @PutMapping("/modifierFournisseur/{id}")
    public ResponseEntity<?> modifierFournisseur(
            @PathVariable Long id,
            @RequestBody Fournisseur fournisseur,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(fournisseurService.modifierFournisseur(id, fournisseur));
    }

    @DeleteMapping("/supprimerFournisseur/{id}")
    public ResponseEntity<?> supprimerFournisseur(
            @PathVariable Long id,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(fournisseurService.supprimerFournisseur(id));
    }
}
