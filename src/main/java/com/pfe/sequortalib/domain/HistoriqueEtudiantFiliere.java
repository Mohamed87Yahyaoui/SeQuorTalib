package com.pfe.sequortalib.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A HistoriqueEtudiantFiliere.
 */
@Entity
@Table(name = "historique_etudiant_filiere")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HistoriqueEtudiantFiliere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "datedebut", nullable = false)
    private LocalDate datedebut;

    @Column(name = "datefin")
    private LocalDate datefin;

    @OneToMany(mappedBy = "historiqueEtudiantFiliere")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Filiere> filieres = new HashSet<>();

    @OneToMany(mappedBy = "historiqueEtudiantFiliere")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Etudiant> etudiants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDatedebut() {
        return datedebut;
    }

    public HistoriqueEtudiantFiliere datedebut(LocalDate datedebut) {
        this.datedebut = datedebut;
        return this;
    }

    public void setDatedebut(LocalDate datedebut) {
        this.datedebut = datedebut;
    }

    public LocalDate getDatefin() {
        return datefin;
    }

    public HistoriqueEtudiantFiliere datefin(LocalDate datefin) {
        this.datefin = datefin;
        return this;
    }

    public void setDatefin(LocalDate datefin) {
        this.datefin = datefin;
    }

    public Set<Filiere> getFilieres() {
        return filieres;
    }

    public HistoriqueEtudiantFiliere filieres(Set<Filiere> filieres) {
        this.filieres = filieres;
        return this;
    }

    public HistoriqueEtudiantFiliere addFiliere(Filiere filiere) {
        this.filieres.add(filiere);
        filiere.setHistoriqueEtudiantFiliere(this);
        return this;
    }

    public HistoriqueEtudiantFiliere removeFiliere(Filiere filiere) {
        this.filieres.remove(filiere);
        filiere.setHistoriqueEtudiantFiliere(null);
        return this;
    }

    public void setFilieres(Set<Filiere> filieres) {
        this.filieres = filieres;
    }

    public Set<Etudiant> getEtudiants() {
        return etudiants;
    }

    public HistoriqueEtudiantFiliere etudiants(Set<Etudiant> etudiants) {
        this.etudiants = etudiants;
        return this;
    }

    public HistoriqueEtudiantFiliere addEtudiant(Etudiant etudiant) {
        this.etudiants.add(etudiant);
        etudiant.setHistoriqueEtudiantFiliere(this);
        return this;
    }

    public HistoriqueEtudiantFiliere removeEtudiant(Etudiant etudiant) {
        this.etudiants.remove(etudiant);
        etudiant.setHistoriqueEtudiantFiliere(null);
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
        if (!(o instanceof HistoriqueEtudiantFiliere)) {
            return false;
        }
        return id != null && id.equals(((HistoriqueEtudiantFiliere) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "HistoriqueEtudiantFiliere{" +
            "id=" + getId() +
            ", datedebut='" + getDatedebut() + "'" +
            ", datefin='" + getDatefin() + "'" +
            "}";
    }
}
