package com.example.gestionstockapi.service;

import com.example.gestionstockapi.model.MouvementStock;

import java.util.List;

public interface MouvementStockService {

    MouvementStock ajouterEntreeStock(MouvementStock mouvementStock);

    MouvementStock ajouterSortieStock(MouvementStock mouvementStock);

    List<MouvementStock> afficherMouvementsStock();

    MouvementStock afficherMouvementStockParId(Long id);

    boolean supprimerMouvementStock(Long id);
}
