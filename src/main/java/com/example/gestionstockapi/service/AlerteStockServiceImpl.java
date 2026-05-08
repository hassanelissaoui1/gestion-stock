package com.example.gestionstockapi.service;

import com.example.gestionstockapi.model.AlerteStock;
import com.example.gestionstockapi.model.EtatAlerte;
import com.example.gestionstockapi.repository.AlerteStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AlerteStockServiceImpl implements AlerteStockService {

    @Autowired
    private AlerteStockRepository alerteStockRepository;

    @Override
    public AlerteStock ajouterAlerte(AlerteStock alerteStock) {
        alerteStock.setDateAlerte(LocalDateTime.now());
        alerteStock.setEtat(EtatAlerte.NOUVELLE);

        return alerteStockRepository.save(alerteStock);
    }

    @Override
    public List<AlerteStock> afficherAlertes() {
        return alerteStockRepository.findAll();
    }

    @Override
    public AlerteStock afficherAlerteParId(Long id) {
        return alerteStockRepository.findById(id).orElse(null);
    }

    @Override
    public AlerteStock consulterAlerte(Long id) {
        AlerteStock alerteStock = alerteStockRepository.findById(id).orElse(null);

        if (alerteStock != null) {
            alerteStock.setEtat(EtatAlerte.CONSULTEE);
            return alerteStockRepository.save(alerteStock);
        }

        return null;
    }

    @Override
    public AlerteStock traiterAlerte(Long id) {
        AlerteStock alerteStock = alerteStockRepository.findById(id).orElse(null);

        if (alerteStock != null) {
            alerteStock.setEtat(EtatAlerte.TRAITEE);
            return alerteStockRepository.save(alerteStock);
        }

        return null;
    }

    @Override
    public boolean supprimerAlerte(Long id) {
        AlerteStock alerteStock = alerteStockRepository.findById(id).orElse(null);

        if (alerteStock != null) {
            alerteStockRepository.delete(alerteStock);
            return true;
        }

        return false;
    }
}
