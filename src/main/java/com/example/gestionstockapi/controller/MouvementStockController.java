package com.example.gestionstockapi.controller;

import com.example.gestionstockapi.model.MouvementStock;
import com.example.gestionstockapi.service.MouvementStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mouvements")
public class MouvementStockController {

    @Autowired
    private MouvementStockService mouvementStockService;

    @PostMapping("/ajouterEntreeStock")
    public MouvementStock ajouterEntreeStock(@RequestBody MouvementStock mouvementStock) {
        return mouvementStockService.ajouterEntreeStock(mouvementStock);
    }

    @PostMapping("/ajouterSortieStock")
    public MouvementStock ajouterSortieStock(@RequestBody MouvementStock mouvementStock) {
        return mouvementStockService.ajouterSortieStock(mouvementStock);
    }

    @GetMapping("/afficherMouvementsStock")
    public List<MouvementStock> afficherMouvementsStock() {
        return mouvementStockService.afficherMouvementsStock();
    }

    @GetMapping("/afficherMouvementStockParId/{id}")
    public MouvementStock afficherMouvementStockParId(@PathVariable Long id) {
        return mouvementStockService.afficherMouvementStockParId(id);
    }

    @DeleteMapping("/supprimerMouvementStock/{id}")
    public boolean supprimerMouvementStock(@PathVariable Long id) {
        return mouvementStockService.supprimerMouvementStock(id);
    }
}
