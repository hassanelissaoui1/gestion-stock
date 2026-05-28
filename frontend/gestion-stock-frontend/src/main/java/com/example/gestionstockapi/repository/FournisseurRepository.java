package com.example.gestionstockapi.repository;

import com.example.gestionstockapi.model.Fournisseur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FournisseurRepository extends JpaRepository<Fournisseur, Long> {
}
