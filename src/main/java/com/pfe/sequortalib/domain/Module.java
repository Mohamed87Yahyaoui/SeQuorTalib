package com.pfe.sequortalib.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
 * A Module.
 */
@Entity
@Table(name = "module")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Module implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "semester")
    private Integer semester;

    @ManyToMany(mappedBy = "modules")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Etudiant> etudiants = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("modules")
    private Filiere filiere;

    @OneToMany(mappedBy = "module")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HistoriqueEtudiantModule> historiqueEtudiantModules = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "module_enseignant",
               joinColumns = @JoinColumn(name = "module_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "enseignant_id", referencedColumnName = "id"))
    private Set<Enseignant> enseignants = new HashSet<>();

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

    public Module nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getSemester() {
        return semester;
    }

    public Module semester(Integer semester) {
        this.semester = semester;
        return this;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public Set<Etudiant> getEtudiants() {
        return etudiants;
    }

    public Module etudiants(Set<Etudiant> etudiants) {
        this.etudiants = etudiants;
        return this;
    }

    public Module addEtudiant(Etudiant etudiant) {
        this.etudiants.add(etudiant);
        etudiant.getModules().add(this);
        return this;
    }

    public Module removeEtudiant(Etudiant etudiant) {
        this.etudiants.remove(etudiant);
        etudiant.getModules().remove(this);
        return this;
    }

    public void setEtudiants(Set<Etudiant> etudiants) {
        this.etudiants = etudiants;
    }

    public Filiere getFiliere() {
        return filiere;
    }

    public Module filiere(Filiere filiere) {
        this.filiere = filiere;
        return this;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }

    public Set<HistoriqueEtudiantModule> getHistoriqueEtudiantModules() {
        return historiqueEtudiantModules;
    }

    public Module historiqueEtudiantModules(Set<HistoriqueEtudiantModule> historiqueEtudiantModules) {
        this.historiqueEtudiantModules = historiqueEtudiantModules;
        return this;
    }

    public Module addHistoriqueEtudiantModule(HistoriqueEtudiantModule historiqueEtudiantModule) {
        this.historiqueEtudiantModules.add(historiqueEtudiantModule);
        historiqueEtudiantModule.setModule(this);
        return this;
    }

    public Module removeHistoriqueEtudiantModule(HistoriqueEtudiantModule historiqueEtudiantModule) {
        this.historiqueEtudiantModules.remove(historiqueEtudiantModule);
        historiqueEtudiantModule.setModule(null);
        return this;
    }

    public void setHistoriqueEtudiantModules(Set<HistoriqueEtudiantModule> historiqueEtudiantModules) {
        this.historiqueEtudiantModules = historiqueEtudiantModules;
    }

    public Set<Enseignant> getEnseignants() {
        return enseignants;
    }

    public Module enseignants(Set<Enseignant> enseignants) {
        this.enseignants = enseignants;
        return this;
    }

    public Module addEnseignant(Enseignant enseignant) {
        this.enseignants.add(enseignant);
        enseignant.getModules().add(this);
        return this;
    }

    public Module removeEnseignant(Enseignant enseignant) {
        this.enseignants.remove(enseignant);
        enseignant.getModules().remove(this);
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
        if (!(o instanceof Module)) {
            return false;
        }
        return id != null && id.equals(((Module) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Module{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", semester=" + getSemester() +
            "}";
    }
}
