package com.example.gestionstockapi.service;

import com.example.gestionstockapi.model.Fournisseur;
import com.example.gestionstockapi.repository.FournisseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FournisseurServiceImpl implements FournisseurService {

    @Autowired
    private FournisseurRepository fournisseurRepository;

    @Override
    public Fournisseur ajouterFournisseur(Fournisseur fournisseur) {
        return fournisseurRepository.save(fournisseur);
    }

    @Override
    public List<Fournisseur> afficherFournisseurs() {
        return fournisseurRepository.findAll();
    }

    @Override
    public Fournisseur afficherFournisseurParId(Long id) {
        return fournisseurRepository.findById(id).orElse(null);
    }

    @Override
    public Fournisseur modifierFournisseur(Long id, Fournisseur fournisseur) {
        Fournisseur currentFournisseur = fournisseurRepository.findById(id).orElse(null);

        if (currentFournisseur != null) {
            currentFournisseur.setNom(fournisseur.getNom());
            currentFournisseur.setTelephone(fournisseur.getTelephone());
            currentFournisseur.setEmail(fournisseur.getEmail());
            currentFournisseur.setAdresse(fournisseur.getAdresse());

            return fournisseurRepository.save(currentFournisseur);
        }

        return null;
    }

    @Override
    public boolean supprimerFournisseur(Long id) {
        Fournisseur fournisseur = fournisseurRepository.findById(id).orElse(null);

        if (fournisseur != null) {
            fournisseurRepository.delete(fournisseur);
            return true;
        }

        return false;
    }
}
