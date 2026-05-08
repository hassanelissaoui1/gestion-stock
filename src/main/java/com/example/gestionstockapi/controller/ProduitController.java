package com.example.gestionstockapi.controller;

import com.example.gestionstockapi.model.Fournisseur;
import com.example.gestionstockapi.model.Produit;
import com.example.gestionstockapi.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @PostMapping("/ajouterProduit")
    public Produit ajouterProduit(@RequestBody Produit produit) {
        return produitService.ajouterProduit(produit);
    }

    @GetMapping("/afficherProduits")
    public List<Produit> afficherProduits() {
        return produitService.afficherProduits();
    }

    @GetMapping("/afficherProduitParId/{id}")
    public Produit afficherProduitParId(@PathVariable Long id) {
        return produitService.afficherProduitParId(id);
    }

    @PutMapping("/modifierProduit/{id}")
    public Produit modifierProduit(@PathVariable Long id, @RequestBody Produit produit) {
        return produitService.modifierProduit(id, produit);
    }

    @DeleteMapping("/supprimerProduit/{id}")
    public boolean supprimerProduit(@PathVariable Long id) {
        return produitService.supprimerProduit(id);
    }

    @GetMapping("/rechercherProduit")
    public List<Produit> rechercherProduit(@RequestParam String critere) {
        return produitService.rechercherProduit(critere);
    }

    @PostMapping("/filtrerProduits")
    public List<Produit> filtrerProduits(@RequestBody Fournisseur fournisseur, @RequestParam String designation) {
        return produitService.filtrerProduits(fournisseur, designation);
    }
}
