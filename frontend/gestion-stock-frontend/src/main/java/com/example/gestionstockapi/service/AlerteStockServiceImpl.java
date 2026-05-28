package com.example.gestionstockapi.service;

import com.example.gestionstockapi.model.AlerteStock;
import com.example.gestionstockapi.model.EtatAlerte;
import com.example.gestionstockapi.model.Produit;
import com.example.gestionstockapi.repository.AlerteStockRepository;
import com.example.gestionstockapi.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AlerteStockServiceImpl implements AlerteStockService {

    @Autowired
    private AlerteStockRepository alerteStockRepository;

    @Autowired
    private ProduitRepository produitRepository;

    @Override
    public AlerteStock ajouterAlerte(AlerteStock alerteStock) {
        Produit produit = alerteStock.getProduit();

        if (produit == null || produit.getId() == null) {
            return null;
        }

        Produit currentProduit = produitRepository.findById(produit.getId()).orElse(null);

        if (currentProduit == null) {
            return null;
        }

        alerteStock.setProduit(currentProduit);
        alerteStock.setDateAlerte(LocalDateTime.now());
        alerteStock.setEtat(EtatAlerte.NOUVELLE);

        return alerteStockRepository.save(alerteStock);
    }

    @Override
    public List<AlerteStock> afficherAlertes() {
        return alerteStockRepository.findAll();
    }

    @Override
    public AlerteStock afficherAlerteParId(Long idAlerte) {
        return alerteStockRepository.findById(idAlerte).orElse(null);
    }

    @Override
    public AlerteStock consulterAlerte(Long idAlerte) {
        AlerteStock alerteStock = alerteStockRepository.findById(idAlerte).orElse(null);

        if (alerteStock != null) {
            alerteStock.setEtat(EtatAlerte.CONSULTEE);
            return alerteStockRepository.save(alerteStock);
        }

        return null;
    }

    @Override
    public AlerteStock traiterAlerte(Long idAlerte) {
        AlerteStock alerteStock = alerteStockRepository.findById(idAlerte).orElse(null);

        if (alerteStock != null) {
            alerteStock.setEtat(EtatAlerte.TRAITEE);
            return alerteStockRepository.save(alerteStock);
        }

        return null;
    }

    @Override
    public boolean supprimerAlerte(Long idAlerte) {
        AlerteStock alerteStock = alerteStockRepository.findById(idAlerte).orElse(null);

        if (alerteStock != null) {
            alerteStockRepository.delete(alerteStock);
            return true;
        }

        return false;
    }
}