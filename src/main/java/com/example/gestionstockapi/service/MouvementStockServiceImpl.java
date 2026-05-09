package com.example.gestionstockapi.service;

import com.example.gestionstockapi.model.MouvementStock;
import com.example.gestionstockapi.model.Produit;
import com.example.gestionstockapi.model.TypeMouvement;
import com.example.gestionstockapi.model.Utilisateur;
import com.example.gestionstockapi.repository.MouvementStockRepository;
import com.example.gestionstockapi.repository.ProduitRepository;
import com.example.gestionstockapi.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MouvementStockServiceImpl implements MouvementStockService {

    @Autowired
    private MouvementStockRepository mouvementStockRepository;

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public MouvementStock ajouterEntreeStock(MouvementStock mouvementStock) {
        Produit produit = mouvementStock.getProduit();
        Utilisateur utilisateur = mouvementStock.getUtilisateur();

        if (produit == null || produit.getId() == null) {
            return null;
        }

        if (utilisateur == null || utilisateur.getId() == null) {
            return null;
        }

        Produit currentProduit = produitRepository.findById(produit.getId()).orElse(null);
        Utilisateur currentUtilisateur = utilisateurRepository.findById(utilisateur.getId()).orElse(null);

        if (currentProduit == null) {
            return null;
        }

        if (currentUtilisateur == null) {
            return null;
        }

        if (mouvementStock.getQuantite() <= 0) {
            return null;
        }

        currentProduit.setQuantiteStock(
                currentProduit.getQuantiteStock() + mouvementStock.getQuantite()
        );

        produitRepository.save(currentProduit);

        mouvementStock.setProduit(currentProduit);
        mouvementStock.setUtilisateur(currentUtilisateur);
        mouvementStock.setType(TypeMouvement.ENTREE);
        mouvementStock.setDateMouvement(LocalDateTime.now());

        return mouvementStockRepository.save(mouvementStock);
    }

    @Override
    public MouvementStock ajouterSortieStock(MouvementStock mouvementStock) {
        Produit produit = mouvementStock.getProduit();
        Utilisateur utilisateur = mouvementStock.getUtilisateur();

        if (produit == null || produit.getId() == null) {
            return null;
        }

        if (utilisateur == null || utilisateur.getId() == null) {
            return null;
        }

        Produit currentProduit = produitRepository.findById(produit.getId()).orElse(null);
        Utilisateur currentUtilisateur = utilisateurRepository.findById(utilisateur.getId()).orElse(null);

        if (currentProduit == null) {
            return null;
        }

        if (currentUtilisateur == null) {
            return null;
        }

        if (mouvementStock.getQuantite() <= 0) {
            return null;
        }

        if (currentProduit.getQuantiteStock() < mouvementStock.getQuantite()) {
            return null;
        }

        currentProduit.setQuantiteStock(
                currentProduit.getQuantiteStock() - mouvementStock.getQuantite()
        );

        produitRepository.save(currentProduit);

        mouvementStock.setProduit(currentProduit);
        mouvementStock.setUtilisateur(currentUtilisateur);
        mouvementStock.setType(TypeMouvement.SORTIE);
        mouvementStock.setDateMouvement(LocalDateTime.now());

        return mouvementStockRepository.save(mouvementStock);
    }

    @Override
    public List<MouvementStock> afficherMouvementsStock() {
        return mouvementStockRepository.findAll();
    }

    @Override
    public MouvementStock afficherMouvementStockParId(Long id) {
        return mouvementStockRepository.findById(id).orElse(null);
    }

    @Override
    public boolean supprimerMouvementStock(Long id) {
        MouvementStock mouvementStock = mouvementStockRepository.findById(id).orElse(null);

        if (mouvementStock != null) {
            mouvementStockRepository.delete(mouvementStock);
            return true;
        }

        return false;
    }
}