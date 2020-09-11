package com.pfe.sequortalib.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import com.pfe.sequortalib.domain.enumeration.Valider;

import com.pfe.sequortalib.domain.enumeration.Typevalidation;

/**
 * A HistoriqueEtudiantModule.
 */
@Entity
@Table(name = "historique_etudiant_module")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HistoriqueEtudiantModule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "note")
    private Float note;

    @Enumerated(EnumType.STRING)
    @Column(name = "validation")
    private Valider validation;

    @Enumerated(EnumType.STRING)
    @Column(name = "etat")
    private Typevalidation etat;

    @OneToMany(mappedBy = "historiqueEtudiantModule")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Module> modules = new HashSet<>();

    @OneToMany(mappedBy = "historiqueEtudiantModule")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Etudiant> etudiants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getNote() {
        return note;
    }

    public HistoriqueEtudiantModule note(Float note) {
        this.note = note;
        return this;
    }

    public void setNote(Float note) {
        this.note = note;
    }

    public Valider getValidation() {
        return validation;
    }

    public HistoriqueEtudiantModule validation(Valider validation) {
        this.validation = validation;
        return this;
    }

    public void setValidation(Valider validation) {
        this.validation = validation;
    }

    public Typevalidation getEtat() {
        return etat;
    }

    public HistoriqueEtudiantModule etat(Typevalidation etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(Typevalidation etat) {
        this.etat = etat;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public HistoriqueEtudiantModule modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public HistoriqueEtudiantModule addModule(Module module) {
        this.modules.add(module);
        module.setHistoriqueEtudiantModule(this);
        return this;
    }

    public HistoriqueEtudiantModule removeModule(Module module) {
        this.modules.remove(module);
        module.setHistoriqueEtudiantModule(null);
        return this;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
    }

    public Set<Etudiant> getEtudiants() {
        return etudiants;
    }

    public HistoriqueEtudiantModule etudiants(Set<Etudiant> etudiants) {
        this.etudiants = etudiants;
        return this;
    }

    public HistoriqueEtudiantModule addEtudiant(Etudiant etudiant) {
        this.etudiants.add(etudiant);
        etudiant.setHistoriqueEtudiantModule(this);
        return this;
    }

    public HistoriqueEtudiantModule removeEtudiant(Etudiant etudiant) {
        this.etudiants.remove(etudiant);
        etudiant.setHistoriqueEtudiantModule(null);
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
        if (!(o instanceof HistoriqueEtudiantModule)) {
            return false;
        }
        return id != null && id.equals(((HistoriqueEtudiantModule) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "HistoriqueEtudiantModule{" +
            "id=" + getId() +
            ", note=" + getNote() +
            ", validation='" + getValidation() + "'" +
            ", etat='" + getEtat() + "'" +
            "}";
    }
}
