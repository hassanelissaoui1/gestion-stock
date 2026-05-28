package com.example.gestionstockapi.controller;

import com.example.gestionstockapi.dto.LoginRequest;
import com.example.gestionstockapi.repository.UtilisateurRepository;
import com.example.gestionstockapi.model.Utilisateur;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UtilisateurRepository utilisateurRepository;

    public AuthController(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        Optional<Utilisateur> utilisateurOptional =
                utilisateurRepository.findByLoginAndMotDePasseAndActifTrue(
                        loginRequest.getLogin(),
                        loginRequest.getMotDePasse()
                );

        if (utilisateurOptional.isPresent()) {
            return ResponseEntity.ok(utilisateurOptional.get());
        }

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Login ou mot de passe incorrect"));
    }
}
