package com.example.gestionstockapi.repository;

import com.example.gestionstockapi.model.AlerteStock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlerteStockRepository extends JpaRepository<AlerteStock, Long> {
}
