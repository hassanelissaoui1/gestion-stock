package com.example.gestionstockapi.controller;

import com.example.gestionstockapi.model.Fournisseur;
import com.example.gestionstockapi.model.Produit;
import com.example.gestionstockapi.repository.FournisseurRepository;
import com.example.gestionstockapi.security.SecuriteService;
import com.example.gestionstockapi.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/produits")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @Autowired
    private SecuriteService securiteService;

    @Autowired
    private FournisseurRepository fournisseurRepository;

    @PostMapping("/ajouterProduit")
    public ResponseEntity<?> ajouterProduit(
            @RequestBody Map<String, Object> data,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        Produit produit = new Produit();

        produit.setDesignation((String) data.get("designation"));
        produit.setDescription((String) data.get("description"));
        produit.setPrix(Double.valueOf(data.get("prix").toString()));
        produit.setQuantiteStock(Integer.valueOf(data.get("quantiteStock").toString()));
        produit.setSeuilMinimum(Integer.valueOf(data.get("seuilMinimum").toString()));

        Map<String, Object> fournisseurMap = (Map<String, Object>) data.get("fournisseur");
        Long fournisseurId = Long.valueOf(fournisseurMap.get("id").toString());

        Fournisseur fournisseur = fournisseurRepository.findById(fournisseurId)
                .orElseThrow(() -> new RuntimeException("Fournisseur introuvable"));

        produit.setFournisseur(fournisseur);

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
            @RequestBody Map<String, Object> data,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        Produit produit = new Produit();

        produit.setDesignation((String) data.get("designation"));
        produit.setDescription((String) data.get("description"));
        produit.setPrix(Double.valueOf(data.get("prix").toString()));
        produit.setQuantiteStock(Integer.valueOf(data.get("quantiteStock").toString()));
        produit.setSeuilMinimum(Integer.valueOf(data.get("seuilMinimum").toString()));

        Map<String, Object> fournisseurMap = (Map<String, Object>) data.get("fournisseur");
        Long fournisseurId = Long.valueOf(fournisseurMap.get("id").toString());

        Fournisseur fournisseur = fournisseurRepository.findById(fournisseurId)
                .orElseThrow(() -> new RuntimeException("Fournisseur introuvable"));

        produit.setFournisseur(fournisseur);

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
