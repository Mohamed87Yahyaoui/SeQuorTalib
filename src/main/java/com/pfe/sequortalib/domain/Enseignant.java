package com.pfe.sequortalib.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
 * A Enseignant.
 */
@Entity
@Table(name = "enseignant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Enseignant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
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
    private Departement departement;

    @OneToOne

    @MapsId
    @JoinColumn(name = "id")
    private User user;

    @ManyToMany(mappedBy = "enseignants")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Filiere> filieres = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "enseignant_module",
               joinColumns = @JoinColumn(name = "enseignant_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "module_id", referencedColumnName = "id"))
    private Set<Module> modules = new HashSet<>();

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

    public User getUser() {
        return user;
    }

    public Enseignant user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Filiere> getFilieres() {
        return filieres;
    }

    public Enseignant filieres(Set<Filiere> filieres) {
        this.filieres = filieres;
        return this;
    }

    public Enseignant addFiliere(Filiere filiere) {
        this.filieres.add(filiere);
        filiere.getEnseignants().add(this);
        return this;
    }

    public Enseignant removeFiliere(Filiere filiere) {
        this.filieres.remove(filiere);
        filiere.getEnseignants().remove(this);
        return this;
    }

    public void setFilieres(Set<Filiere> filieres) {
        this.filieres = filieres;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public Enseignant modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public Enseignant addModule(Module module) {
        this.modules.add(module);
        module.getEnseignants().add(this);
        return this;
    }

    public Enseignant removeModule(Module module) {
        this.modules.remove(module);
        module.getEnseignants().remove(this);
        return this;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
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
