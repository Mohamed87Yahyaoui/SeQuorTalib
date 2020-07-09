package com.pfe.sequortalib.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

/**
 * A Enseignant.
 */
@Entity
@Table(name = "enseignant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Enseignant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tel")
    private Integer tel;

    @Column(name = "datenaissance")
    private LocalDate datenaissance;

    @NotNull
    @Column(name = "cin", nullable = false)
    private String cin;

    @Column(name = "grade")
    private String grade;

    @ManyToOne
    @JsonIgnoreProperties("enseignants")
    private HistoriqueEnseignantModule historiqueEnseignantModule;

    @ManyToOne
    @JsonIgnoreProperties("enseignants")
    private HistoriqueEnseignantFiliere historiqueEnseignantFiliere;

    @ManyToOne
    @JsonIgnoreProperties("enseignants")
    private Departement departement;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTel() {
        return tel;
    }

    public Enseignant tel(Integer tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(Integer tel) {
        this.tel = tel;
    }

    public LocalDate getDatenaissance() {
        return datenaissance;
    }

    public Enseignant datenaissance(LocalDate datenaissance) {
        this.datenaissance = datenaissance;
        return this;
    }

    public void setDatenaissance(LocalDate datenaissance) {
        this.datenaissance = datenaissance;
    }

    public String getCin() {
        return cin;
    }

    public Enseignant cin(String cin) {
        this.cin = cin;
        return this;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getGrade() {
        return grade;
    }

    public Enseignant grade(String grade) {
        this.grade = grade;
        return this;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public HistoriqueEnseignantModule getHistoriqueEnseignantModule() {
        return historiqueEnseignantModule;
    }

    public Enseignant historiqueEnseignantModule(HistoriqueEnseignantModule historiqueEnseignantModule) {
        this.historiqueEnseignantModule = historiqueEnseignantModule;
        return this;
    }

    public void setHistoriqueEnseignantModule(HistoriqueEnseignantModule historiqueEnseignantModule) {
        this.historiqueEnseignantModule = historiqueEnseignantModule;
    }

    public HistoriqueEnseignantFiliere getHistoriqueEnseignantFiliere() {
        return historiqueEnseignantFiliere;
    }

    public Enseignant historiqueEnseignantFiliere(HistoriqueEnseignantFiliere historiqueEnseignantFiliere) {
        this.historiqueEnseignantFiliere = historiqueEnseignantFiliere;
        return this;
    }

    public void setHistoriqueEnseignantFiliere(HistoriqueEnseignantFiliere historiqueEnseignantFiliere) {
        this.historiqueEnseignantFiliere = historiqueEnseignantFiliere;
    }

    public Departement getDepartement() {
        return departement;
    }

    public Enseignant departement(Departement departement) {
        this.departement = departement;
        return this;
    }

    public void setDepartement(Departement departement) {
        this.departement = departement;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Enseignant)) {
            return false;
        }
        return id != null && id.equals(((Enseignant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Enseignant{" +
            "id=" + getId() +
            ", tel=" + getTel() +
            ", datenaissance='" + getDatenaissance() + "'" +
            ", cin='" + getCin() + "'" +
            ", grade='" + getGrade() + "'" +
            "}";
    }
}
