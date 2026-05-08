package com.example.gestionstockapi.controller;

import com.example.gestionstockapi.model.Role;
import com.example.gestionstockapi.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/ajouterRole")
    public Role ajouterRole(@RequestBody Role role) {
        return roleService.ajouterRole(role);
    }

    @GetMapping("/afficherRoles")
    public List<Role> afficherRoles() {
        return roleService.afficherRoles();
    }

    @GetMapping("/afficherRoleParId/{id}")
    public Role afficherRoleParId(@PathVariable Long id) {
        return roleService.afficherRoleParId(id);
    }

    @PutMapping("/modifierRole/{id}")
    public Role modifierRole(@PathVariable Long id, @RequestBody Role role) {
        return roleService.modifierRole(id, role);
    }

    @DeleteMapping("/supprimerRole/{id}")
    public boolean supprimerRole(@PathVariable Long id) {
        return roleService.supprimerRole(id);
    }
}
