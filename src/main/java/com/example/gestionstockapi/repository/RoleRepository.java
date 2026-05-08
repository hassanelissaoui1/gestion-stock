package com.example.gestionstockapi.repository;

import com.example.gestionstockapi.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
