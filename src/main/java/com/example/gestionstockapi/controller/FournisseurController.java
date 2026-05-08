package com.example.gestionstockapi.controller;

import com.example.gestionstockapi.model.Fournisseur;
import com.example.gestionstockapi.service.FournisseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fournisseurs")
public class FournisseurController {

    @Autowired
    private FournisseurService fournisseurService;

    @PostMapping("/ajouterFournisseur")
    public Fournisseur ajouterFournisseur(@RequestBody Fournisseur fournisseur) {
        return fournisseurService.ajouterFournisseur(fournisseur);
    }

    @GetMapping("/afficherFournisseurs")
    public List<Fournisseur> afficherFournisseurs() {
        return fournisseurService.afficherFournisseurs();
    }

    @GetMapping("/afficherFournisseurParId/{id}")
    public Fournisseur afficherFournisseurParId(@PathVariable Long id) {
        return fournisseurService.afficherFournisseurParId(id);
    }

    @PutMapping("/modifierFournisseur/{id}")
    public Fournisseur modifierFournisseur(@PathVariable Long id, @RequestBody Fournisseur fournisseur) {
        return fournisseurService.modifierFournisseur(id, fournisseur);
    }

    @DeleteMapping("/supprimerFournisseur/{id}")
    public boolean supprimerFournisseur(@PathVariable Long id) {
        return fournisseurService.supprimerFournisseur(id);
    }
}
