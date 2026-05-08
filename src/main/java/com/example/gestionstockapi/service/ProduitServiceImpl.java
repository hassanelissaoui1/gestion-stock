package com.example.gestionstockapi.service;

import com.example.gestionstockapi.model.Fournisseur;
import com.example.gestionstockapi.model.Produit;
import com.example.gestionstockapi.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProduitServiceImpl implements ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    @Override
    public Produit ajouterProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    @Override
    public List<Produit> afficherProduits() {
        return produitRepository.findAll();
    }

    @Override
    public Produit afficherProduitParId(Long id) {
        return produitRepository.findById(id).orElse(null);
    }

    @Override
    public Produit modifierProduit(Long id, Produit produit) {
        Produit currentProduit = produitRepository.findById(id).orElse(null);

        if (currentProduit != null) {
            currentProduit.setDesignation(produit.getDesignation());
            currentProduit.setDescription(produit.getDescription());
            currentProduit.setPrix(produit.getPrix());
            currentProduit.setQuantiteStock(produit.getQuantiteStock());
            currentProduit.setSeuilMinimum(produit.getSeuilMinimum());
            currentProduit.setFournisseur(produit.getFournisseur());

            return produitRepository.save(currentProduit);
        }

        return null;
    }

    @Override
    public boolean supprimerProduit(Long id) {
        Produit produit = produitRepository.findById(id).orElse(null);

        if (produit != null) {
            produitRepository.delete(produit);
            return true;
        }

        return false;
    }

    @Override
    public List<Produit> rechercherProduit(String critere) {
        List<Produit> produits = produitRepository.findAll();
        List<Produit> resultats = new ArrayList<>();

        if (critere == null || critere.isEmpty()) {
            return produits;
        }

        for (Produit produit : produits) {
            if (produit.getDesignation() != null &&
                    produit.getDesignation().toLowerCase().contains(critere.toLowerCase())) {
                resultats.add(produit);
            }
        }

        return resultats;
    }

    @Override
    public List<Produit> filtrerProduits(Fournisseur fournisseur, String designation) {
        List<Produit> produits = produitRepository.findAll();
        List<Produit> resultats = new ArrayList<>();

        for (Produit produit : produits) {
            boolean fournisseurValide = true;
            boolean designationValide = true;

            if (fournisseur != null) {
                fournisseurValide = produit.getFournisseur() != null &&
                        produit.getFournisseur().getId().equals(fournisseur.getId());
            }

            if (designation != null && !designation.isEmpty()) {
                designationValide = produit.getDesignation() != null &&
                        produit.getDesignation().toLowerCase().contains(designation.toLowerCase());
            }

            if (fournisseurValide && designationValide) {
                resultats.add(produit);
            }
        }

        return resultats;
    }
}
