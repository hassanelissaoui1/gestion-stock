package com.example.gestionstockapi.repository;

import com.example.gestionstockapi.model.MouvementStock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MouvementStockRepository extends JpaRepository<MouvementStock, Long> {
}
