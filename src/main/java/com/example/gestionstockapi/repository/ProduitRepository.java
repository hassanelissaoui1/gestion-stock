package com.example.gestionstockapi.repository;

import com.example.gestionstockapi.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
}
