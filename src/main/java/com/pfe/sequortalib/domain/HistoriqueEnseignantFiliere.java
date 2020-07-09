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
 * A HistoriqueEnseignantFiliere.
 */
@Entity
@Table(name = "historique_enseignant_filiere")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HistoriqueEnseignantFiliere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "datedebut", nullable = false)
    private LocalDate datedebut;

    @Column(name = "datefin")
    private LocalDate datefin;

    @OneToMany(mappedBy = "historiqueEnseignantFiliere")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Filiere> filieres = new HashSet<>();

    @OneToMany(mappedBy = "historiqueEnseignantFiliere")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Enseignant> enseignants = new HashSet<>();

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

    public HistoriqueEnseignantFiliere datedebut(LocalDate datedebut) {
        this.datedebut = datedebut;
        return this;
    }

    public void setDatedebut(LocalDate datedebut) {
        this.datedebut = datedebut;
    }

    public LocalDate getDatefin() {
        return datefin;
    }

    public HistoriqueEnseignantFiliere datefin(LocalDate datefin) {
        this.datefin = datefin;
        return this;
    }

    public void setDatefin(LocalDate datefin) {
        this.datefin = datefin;
    }

    public Set<Filiere> getFilieres() {
        return filieres;
    }

    public HistoriqueEnseignantFiliere filieres(Set<Filiere> filieres) {
        this.filieres = filieres;
        return this;
    }

    public HistoriqueEnseignantFiliere addFiliere(Filiere filiere) {
        this.filieres.add(filiere);
        filiere.setHistoriqueEnseignantFiliere(this);
        return this;
    }

    public HistoriqueEnseignantFiliere removeFiliere(Filiere filiere) {
        this.filieres.remove(filiere);
        filiere.setHistoriqueEnseignantFiliere(null);
        return this;
    }

    public void setFilieres(Set<Filiere> filieres) {
        this.filieres = filieres;
    }

    public Set<Enseignant> getEnseignants() {
        return enseignants;
    }

    public HistoriqueEnseignantFiliere enseignants(Set<Enseignant> enseignants) {
        this.enseignants = enseignants;
        return this;
    }

    public HistoriqueEnseignantFiliere addEnseignant(Enseignant enseignant) {
        this.enseignants.add(enseignant);
        enseignant.setHistoriqueEnseignantFiliere(this);
        return this;
    }

    public HistoriqueEnseignantFiliere removeEnseignant(Enseignant enseignant) {
        this.enseignants.remove(enseignant);
        enseignant.setHistoriqueEnseignantFiliere(null);
        return this;
    }

    public void setEnseignants(Set<Enseignant> enseignants) {
        this.enseignants = enseignants;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HistoriqueEnseignantFiliere)) {
            return false;
        }
        return id != null && id.equals(((HistoriqueEnseignantFiliere) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "HistoriqueEnseignantFiliere{" +
            "id=" + getId() +
            ", datedebut='" + getDatedebut() + "'" +
            ", datefin='" + getDatefin() + "'" +
            "}";
    }
}
