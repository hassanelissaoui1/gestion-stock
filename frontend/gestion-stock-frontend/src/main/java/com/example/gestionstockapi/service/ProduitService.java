package com.example.gestionstockapi.service;

import com.example.gestionstockapi.model.Fournisseur;
import com.example.gestionstockapi.model.Produit;

import java.util.List;

public interface ProduitService {

    Produit ajouterProduit(Produit produit);

    List<Produit> afficherProduits();

    Produit afficherProduitParId(Long id);

    Produit modifierProduit(Long id, Produit produit);

    boolean supprimerProduit(Long id);

    List<Produit> rechercherProduit(String critere);

    List<Produit> filtrerProduits(Fournisseur fournisseur, String designation);
}
