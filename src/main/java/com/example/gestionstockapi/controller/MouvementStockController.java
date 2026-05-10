package com.example.gestionstockapi.controller;

import com.example.gestionstockapi.model.MouvementStock;
import com.example.gestionstockapi.security.SecuriteService;
import com.example.gestionstockapi.service.MouvementStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mouvements")
public class MouvementStockController {

    @Autowired
    private MouvementStockService mouvementStockService;

    @Autowired
    private SecuriteService securiteService;

    @PostMapping("/ajouterEntreeStock")
    public ResponseEntity<?> ajouterEntreeStock(
            @RequestBody MouvementStock mouvementStock,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdminOuGestionnaireStock(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(mouvementStockService.ajouterEntreeStock(mouvementStock));
    }

    @PostMapping("/ajouterSortieStock")
    public ResponseEntity<?> ajouterSortieStock(
            @RequestBody MouvementStock mouvementStock,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdminOuGestionnaireStock(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(mouvementStockService.ajouterSortieStock(mouvementStock));
    }

    @GetMapping("/afficherMouvementsStock")
    public ResponseEntity<?> afficherMouvementsStock(
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(mouvementStockService.afficherMouvementsStock());
    }

    @GetMapping("/afficherMouvementStockParId/{id}")
    public ResponseEntity<?> afficherMouvementStockParId(
            @PathVariable Long id,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(mouvementStockService.afficherMouvementStockParId(id));
    }

    @DeleteMapping("/supprimerMouvementStock/{id}")
    public ResponseEntity<?> supprimerMouvementStock(
            @PathVariable Long id,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(mouvementStockService.supprimerMouvementStock(id));
    }
}
