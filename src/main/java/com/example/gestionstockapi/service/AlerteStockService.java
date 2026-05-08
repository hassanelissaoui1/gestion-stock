package com.example.gestionstockapi.service;

import com.example.gestionstockapi.model.AlerteStock;

import java.util.List;

public interface AlerteStockService {

    AlerteStock ajouterAlerte(AlerteStock alerteStock);

    List<AlerteStock> afficherAlertes();

    AlerteStock afficherAlerteParId(Long id);

    AlerteStock consulterAlerte(Long id);

    AlerteStock traiterAlerte(Long id);

    boolean supprimerAlerte(Long id);
}
