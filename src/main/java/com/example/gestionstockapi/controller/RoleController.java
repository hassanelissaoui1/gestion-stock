package com.example.gestionstockapi.controller;

import com.example.gestionstockapi.model.Role;
import com.example.gestionstockapi.security.SecuriteService;
import com.example.gestionstockapi.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private SecuriteService securiteService;

    @PostMapping("/ajouterRole")
    public ResponseEntity<?> ajouterRole(
            @RequestBody Role role,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(roleService.ajouterRole(role));
    }

    @GetMapping("/afficherRoles")
    public ResponseEntity<?> afficherRoles(
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(roleService.afficherRoles());
    }

    @GetMapping("/afficherRoleParId/{id}")
    public ResponseEntity<?> afficherRoleParId(
            @PathVariable Long id,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(roleService.afficherRoleParId(id));
    }

    @PutMapping("/modifierRole/{id}")
    public ResponseEntity<?> modifierRole(
            @PathVariable Long id,
            @RequestBody Role role,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(roleService.modifierRole(id, role));
    }

    @DeleteMapping("/supprimerRole/{id}")
    public ResponseEntity<?> supprimerRole(
            @PathVariable Long id,
            @RequestHeader(value = "X-Utilisateur-Id", required = false) Long utilisateurId
    ) {
        if (!securiteService.estAdmin(utilisateurId)) {
            return ResponseEntity.status(403).body("Accès refusé");
        }

        return ResponseEntity.ok(roleService.supprimerRole(id));
    }
}
