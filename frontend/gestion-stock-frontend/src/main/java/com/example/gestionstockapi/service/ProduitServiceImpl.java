package com.example.gestionstockapi.service;

import com.example.gestionstockapi.model.Fournisseur;
import com.example.gestionstockapi.model.Produit;
import com.example.gestionstockapi.repository.FournisseurRepository;
import com.example.gestionstockapi.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitServiceImpl implements ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private FournisseurRepository fournisseurRepository;

    @Override
    public Produit ajouterProduit(Produit produit) {

        if (produit.getFournisseur() == null || produit.getFournisseur().getId() == null) {
            throw new RuntimeException("Fournisseur obligatoire");
        }

        Fournisseur fournisseur = fournisseurRepository.findById(produit.getFournisseur().getId())
                .orElseThrow(() -> new RuntimeException("Fournisseur introuvable"));

        produit.setFournisseur(fournisseur);

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
        Produit produitExistant = produitRepository.findById(id).orElse(null);

        if (produitExistant != null) {
            produitExistant.setDesignation(produit.getDesignation());
            produitExistant.setDescription(produit.getDescription());
            produitExistant.setPrix(produit.getPrix());
            produitExistant.setQuantiteStock(produit.getQuantiteStock());
            produitExistant.setSeuilMinimum(produit.getSeuilMinimum());

            if (produit.getFournisseur() != null && produit.getFournisseur().getId() != null) {
                Fournisseur fournisseur = fournisseurRepository.findById(produit.getFournisseur().getId())
                        .orElseThrow(() -> new RuntimeException("Fournisseur introuvable"));

                produitExistant.setFournisseur(fournisseur);
            }

            return produitRepository.save(produitExistant);
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
        return produitRepository.findAll()
                .stream()
                .filter(produit ->
                        produit.getDesignation().toLowerCase().contains(critere.toLowerCase()) ||
                        produit.getDescription().toLowerCase().contains(critere.toLowerCase())
                )
                .toList();
    }

    @Override
    public List<Produit> filtrerProduits(Fournisseur fournisseur, String designation) {
        return produitRepository.findAll()
                .stream()
                .filter(produit ->
                        (fournisseur == null || produit.getFournisseur().getId().equals(fournisseur.getId())) &&
                        (designation == null || produit.getDesignation().toLowerCase().contains(designation.toLowerCase()))
                )
                .toList();
    }
}
