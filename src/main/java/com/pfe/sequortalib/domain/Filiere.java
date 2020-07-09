package com.pfe.sequortalib.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Filiere.
 */
@Entity
@Table(name = "filiere")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Filiere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "filiere_module",
               joinColumns = @JoinColumn(name = "filiere_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "module_id", referencedColumnName = "id"))
    private Set<Module> modules = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("filieres")
    private Departement departement;

    @ManyToOne
    @JsonIgnoreProperties("filieres")
    private HistoriqueEnseignantFiliere historiqueEnseignantFiliere;

    @ManyToOne
    @JsonIgnoreProperties("filieres")
    private HistoriqueEtudiantFiliere historiqueEtudiantFiliere;

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

    public Filiere nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public Filiere modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public Filiere addModule(Module module) {
        this.modules.add(module);
        module.getFilieres().add(this);
        return this;
    }

    public Filiere removeModule(Module module) {
        this.modules.remove(module);
        module.getFilieres().remove(this);
        return this;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
    }

    public Departement getDepartement() {
        return departement;
    }

    public Filiere departement(Departement departement) {
        this.departement = departement;
        return this;
    }

    public void setDepartement(Departement departement) {
        this.departement = departement;
    }

    public HistoriqueEnseignantFiliere getHistoriqueEnseignantFiliere() {
        return historiqueEnseignantFiliere;
    }

    public Filiere historiqueEnseignantFiliere(HistoriqueEnseignantFiliere historiqueEnseignantFiliere) {
        this.historiqueEnseignantFiliere = historiqueEnseignantFiliere;
        return this;
    }

    public void setHistoriqueEnseignantFiliere(HistoriqueEnseignantFiliere historiqueEnseignantFiliere) {
        this.historiqueEnseignantFiliere = historiqueEnseignantFiliere;
    }

    public HistoriqueEtudiantFiliere getHistoriqueEtudiantFiliere() {
        return historiqueEtudiantFiliere;
    }

    public Filiere historiqueEtudiantFiliere(HistoriqueEtudiantFiliere historiqueEtudiantFiliere) {
        this.historiqueEtudiantFiliere = historiqueEtudiantFiliere;
        return this;
    }

    public void setHistoriqueEtudiantFiliere(HistoriqueEtudiantFiliere historiqueEtudiantFiliere) {
        this.historiqueEtudiantFiliere = historiqueEtudiantFiliere;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Filiere)) {
            return false;
        }
        return id != null && id.equals(((Filiere) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Filiere{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}
