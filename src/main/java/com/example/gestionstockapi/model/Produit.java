package com.example.gestionstockapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String designation;

    private String description;

    private Double prix;

    private Integer quantiteStock;

    private Integer seuilMinimum;

    @ManyToOne
    @JoinColumn(name = "fournisseur_id", nullable = false)
    @JsonIgnore
    private Fournisseur fournisseur;

    @JsonIgnore
    @OneToMany(mappedBy = "produit")
    private List<MouvementStock> mouvementsStock;
}
