package com.example.gestionstockapi.controller;

import com.example.gestionstockapi.model.AlerteStock;
import com.example.gestionstockapi.security.SecuriteService;
import com.example.gestionstockapi.service.AlerteStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/alertes")
public class AlerteStockController {

    @Autowired
    private AlerteStockService alerteStockService;

    @Autowired
    private SecuriteService securiteService;

    @PostMapping("/ajouterAlerte")
    public ResponseEntity<?> ajouterAlerte(
            @RequestBody AlerteStock alerteStock,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(alerteStockService.ajouterAlerte(alerteStock));
    }

    @GetMapping("/afficherAlertes")
    public ResponseEntity<?> afficherAlertes(
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdminOuGestionnaireStock(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(alerteStockService.afficherAlertes());
    }

    @GetMapping("/afficherAlerteParId/{id}")
    public ResponseEntity<?> afficherAlerteParId(
            @PathVariable Long id,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdminOuGestionnaireStock(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(alerteStockService.afficherAlerteParId(id));
    }

    @PutMapping("/consulterAlerte/{id}")
    public ResponseEntity<?> consulterAlerte(
            @PathVariable Long id,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(alerteStockService.consulterAlerte(id));
    }

    @PutMapping("/traiterAlerte/{id}")
    public ResponseEntity<?> traiterAlerte(
            @PathVariable Long id,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(alerteStockService.traiterAlerte(id));
    }

    @DeleteMapping("/supprimerAlerte/{id}")
    public ResponseEntity<?> supprimerAlerte(
            @PathVariable Long id,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(alerteStockService.supprimerAlerte(id));
    }
}
