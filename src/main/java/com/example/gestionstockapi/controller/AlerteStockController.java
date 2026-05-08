package com.example.gestionstockapi.controller;

import com.example.gestionstockapi.model.AlerteStock;
import com.example.gestionstockapi.service.AlerteStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alertes")
public class AlerteStockController {

    @Autowired
    private AlerteStockService alerteStockService;

    @PostMapping("/ajouterAlerte")
    public AlerteStock ajouterAlerte(@RequestBody AlerteStock alerteStock) {
        return alerteStockService.ajouterAlerte(alerteStock);
    }

    @GetMapping("/afficherAlertes")
    public List<AlerteStock> afficherAlertes() {
        return alerteStockService.afficherAlertes();
    }

    @GetMapping("/afficherAlerteParId/{id}")
    public AlerteStock afficherAlerteParId(@PathVariable Long id) {
        return alerteStockService.afficherAlerteParId(id);
    }

    @PutMapping("/consulterAlerte/{id}")
    public AlerteStock consulterAlerte(@PathVariable Long id) {
        return alerteStockService.consulterAlerte(id);
    }

    @PutMapping("/traiterAlerte/{id}")
    public AlerteStock traiterAlerte(@PathVariable Long id) {
        return alerteStockService.traiterAlerte(id);
    }

    @DeleteMapping("/supprimerAlerte/{id}")
    public boolean supprimerAlerte(@PathVariable Long id) {
        return alerteStockService.supprimerAlerte(id);
    }
}
