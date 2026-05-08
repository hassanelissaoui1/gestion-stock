package com.example.gestionstockapi.service;

import com.example.gestionstockapi.model.Fournisseur;

import java.util.List;

public interface FournisseurService {

    Fournisseur ajouterFournisseur(Fournisseur fournisseur);

    List<Fournisseur> afficherFournisseurs();

    Fournisseur afficherFournisseurParId(Long id);

    Fournisseur modifierFournisseur(Long id, Fournisseur fournisseur);

    boolean supprimerFournisseur(Long id);
}
