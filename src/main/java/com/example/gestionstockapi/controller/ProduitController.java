package com.example.gestionstockapi.controller;

import com.example.gestionstockapi.model.Fournisseur;
import com.example.gestionstockapi.model.Produit;
import com.example.gestionstockapi.security.SecuriteService;
import com.example.gestionstockapi.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/produits")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @Autowired
    private SecuriteService securiteService;

    @PostMapping("/ajouterProduit")
    public ResponseEntity<?> ajouterProduit(
            @RequestBody Produit produit,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(produitService.ajouterProduit(produit));
    }

    @GetMapping("/afficherProduits")
    public ResponseEntity<?> afficherProduits(
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdminOuGestionnaireStock(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(produitService.afficherProduits());
    }

    @GetMapping("/afficherProduitParId/{id}")
    public ResponseEntity<?> afficherProduitParId(
            @PathVariable Long id,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdminOuGestionnaireStock(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(produitService.afficherProduitParId(id));
    }

    @PutMapping("/modifierProduit/{id}")
    public ResponseEntity<?> modifierProduit(
            @PathVariable Long id,
            @RequestBody Produit produit,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(produitService.modifierProduit(id, produit));
    }

    @DeleteMapping("/supprimerProduit/{id}")
    public ResponseEntity<?> supprimerProduit(
            @PathVariable Long id,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(produitService.supprimerProduit(id));
    }

    @GetMapping("/rechercherProduit")
    public ResponseEntity<?> rechercherProduit(
            @RequestParam String critere,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdminOuGestionnaireStock(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(produitService.rechercherProduit(critere));
    }

    @PostMapping("/filtrerProduits")
    public ResponseEntity<?> filtrerProduits(
            @RequestBody Fournisseur fournisseur,
            @RequestParam String designation,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdminOuGestionnaireStock(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(produitService.filtrerProduits(fournisseur, designation));
    }
}
