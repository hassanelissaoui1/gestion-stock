package com.example.gestionstockapi.service;

import com.example.gestionstockapi.model.Role;
import com.example.gestionstockapi.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role ajouterRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public List<Role> afficherRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role afficherRoleParId(Long id) {

        return roleRepository.findById(id).orElse(null);


    }

    @Override
    public Role modifierRole(Long id, Role role) {
        Role currentRole = roleRepository.findById(id).orElse(null);

        if (currentRole != null) {
            currentRole.setNom(role.getNom());
            return roleRepository.save(currentRole);
        } else {
            return null;
        }


    }

    @Override
    public boolean supprimerRole(Long id) {

        Role role = roleRepository.findById(id).orElse(null);

        if (role != null) {
            roleRepository.delete(role);
            return true;
        } else {
            return false;
        }
    }
}
