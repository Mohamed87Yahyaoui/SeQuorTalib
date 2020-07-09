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
 * A HistoriqueEnseignantModule.
 */
@Entity
@Table(name = "historique_enseignant_module")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HistoriqueEnseignantModule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "datedebut", nullable = false)
    private LocalDate datedebut;

    @Column(name = "datefin")
    private LocalDate datefin;

    @OneToMany(mappedBy = "historiqueEnseignantModule")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Module> modules = new HashSet<>();

    @OneToMany(mappedBy = "historiqueEnseignantModule")
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

    public HistoriqueEnseignantModule datedebut(LocalDate datedebut) {
        this.datedebut = datedebut;
        return this;
    }

    public void setDatedebut(LocalDate datedebut) {
        this.datedebut = datedebut;
    }

    public LocalDate getDatefin() {
        return datefin;
    }

    public HistoriqueEnseignantModule datefin(LocalDate datefin) {
        this.datefin = datefin;
        return this;
    }

    public void setDatefin(LocalDate datefin) {
        this.datefin = datefin;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public HistoriqueEnseignantModule modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public HistoriqueEnseignantModule addModule(Module module) {
        this.modules.add(module);
        module.setHistoriqueEnseignantModule(this);
        return this;
    }

    public HistoriqueEnseignantModule removeModule(Module module) {
        this.modules.remove(module);
        module.setHistoriqueEnseignantModule(null);
        return this;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
    }

    public Set<Enseignant> getEnseignants() {
        return enseignants;
    }

    public HistoriqueEnseignantModule enseignants(Set<Enseignant> enseignants) {
        this.enseignants = enseignants;
        return this;
    }

    public HistoriqueEnseignantModule addEnseignant(Enseignant enseignant) {
        this.enseignants.add(enseignant);
        enseignant.setHistoriqueEnseignantModule(this);
        return this;
    }

    public HistoriqueEnseignantModule removeEnseignant(Enseignant enseignant) {
        this.enseignants.remove(enseignant);
        enseignant.setHistoriqueEnseignantModule(null);
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
        if (!(o instanceof HistoriqueEnseignantModule)) {
            return false;
        }
        return id != null && id.equals(((HistoriqueEnseignantModule) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "HistoriqueEnseignantModule{" +
            "id=" + getId() +
            ", datedebut='" + getDatedebut() + "'" +
            ", datefin='" + getDatefin() + "'" +
            "}";
    }
}
