package com.example.gestionstockapi.service;

import com.example.gestionstockapi.model.Role;

import java.util.List;

public interface RoleService {

    Role ajouterRole(Role role);

    List<Role> afficherRoles();

    Role afficherRoleParId(Long id);

    Role modifierRole(Long id, Role role);

    boolean supprimerRole(Long id);
}
