package com.pfe.sequortalib.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import com.pfe.sequortalib.domain.enumeration.Typecycle;

/**
 * A Etablissement.
 */
@Entity
@Table(name = "etablissement")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Etablissement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "filiere")
    private String filiere;

    @Enumerated(EnumType.STRING)
    @Column(name = "cycle")
    private Typecycle cycle;

    @OneToMany(mappedBy = "etablissement")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Etudiant> etudiants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Etablissement nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getFiliere() {
        return filiere;
    }

    public Etablissement filiere(String filiere) {
        this.filiere = filiere;
        return this;
    }

    public void setFiliere(String filiere) {
        this.filiere = filiere;
    }

    public Typecycle getCycle() {
        return cycle;
    }

    public Etablissement cycle(Typecycle cycle) {
        this.cycle = cycle;
        return this;
    }

    public void setCycle(Typecycle cycle) {
        this.cycle = cycle;
    }

    public Set<Etudiant> getEtudiants() {
        return etudiants;
    }

    public Etablissement etudiants(Set<Etudiant> etudiants) {
        this.etudiants = etudiants;
        return this;
    }

    public Etablissement addEtudiant(Etudiant etudiant) {
        this.etudiants.add(etudiant);
        etudiant.setEtablissement(this);
        return this;
    }

    public Etablissement removeEtudiant(Etudiant etudiant) {
        this.etudiants.remove(etudiant);
        etudiant.setEtablissement(null);
        return this;
    }

    public void setEtudiants(Set<Etudiant> etudiants) {
        this.etudiants = etudiants;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Etablissement)) {
            return false;
        }
        return id != null && id.equals(((Etablissement) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Etablissement{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", filiere='" + getFiliere() + "'" +
            ", cycle='" + getCycle() + "'" +
            "}";
    }
}
