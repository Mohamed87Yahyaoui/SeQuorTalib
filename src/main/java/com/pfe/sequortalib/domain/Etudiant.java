package com.pfe.sequortalib.domain;

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

import com.pfe.sequortalib.domain.enumeration.Status;

/**
 * A Etudiant.
 */
@Entity
@Table(name = "etudiant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Etudiant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "tel")
    private Integer tel;

    @NotNull
    @Column(name = "cin", nullable = false)
    private String cin;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "etat", nullable = false)
    private Status etat;

    @Column(name = "datenaissance")
    private LocalDate datenaissance;

    @Column(name = "semsetre")
    private Integer semsetre;

    @Column(name = "section")
    private String section;

    @Column(name = "promo")
    private Integer promo;

    @ManyToOne
    @JsonIgnoreProperties("etudiants")
    private Etablissement etablissement;

    @OneToOne

    @MapsId
    @JoinColumn(name = "id")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("etudiants")
    private Filiere filiere;

    @OneToMany(mappedBy = "etudiant")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HistoriqueEtudiantModule> historiqueEtudiantModules = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "etudiant_module",
               joinColumns = @JoinColumn(name = "etudiant_id", referencedColumnName = "id"),
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

    public Etudiant tel(Integer tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(Integer tel) {
        this.tel = tel;
    }

    public String getCin() {
        return cin;
    }

    public Etudiant cin(String cin) {
        this.cin = cin;
        return this;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public Status getEtat() {
        return etat;
    }

    public Etudiant etat(Status etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(Status etat) {
        this.etat = etat;
    }

    public LocalDate getDatenaissance() {
        return datenaissance;
    }

    public Etudiant datenaissance(LocalDate datenaissance) {
        this.datenaissance = datenaissance;
        return this;
    }

    public void setDatenaissance(LocalDate datenaissance) {
        this.datenaissance = datenaissance;
    }

    public Integer getSemsetre() {
        return semsetre;
    }

    public Etudiant semsetre(Integer semsetre) {
        this.semsetre = semsetre;
        return this;
    }

    public void setSemsetre(Integer semsetre) {
        this.semsetre = semsetre;
    }

    public String getSection() {
        return section;
    }

    public Etudiant section(String section) {
        this.section = section;
        return this;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public Integer getPromo() {
        return promo;
    }

    public Etudiant promo(Integer promo) {
        this.promo = promo;
        return this;
    }

    public void setPromo(Integer promo) {
        this.promo = promo;
    }

    public Etablissement getEtablissement() {
        return etablissement;
    }

    public Etudiant etablissement(Etablissement etablissement) {
        this.etablissement = etablissement;
        return this;
    }

    public void setEtablissement(Etablissement etablissement) {
        this.etablissement = etablissement;
    }

    public User getUser() {
        return user;
    }

    public Etudiant user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Filiere getFiliere() {
        return filiere;
    }

    public Etudiant filiere(Filiere filiere) {
        this.filiere = filiere;
        return this;
    }

    public void setFiliere(Filiere filiere) {
        this.filiere = filiere;
    }

    public Set<HistoriqueEtudiantModule> getHistoriqueEtudiantModules() {
        return historiqueEtudiantModules;
    }

    public Etudiant historiqueEtudiantModules(Set<HistoriqueEtudiantModule> historiqueEtudiantModules) {
        this.historiqueEtudiantModules = historiqueEtudiantModules;
        return this;
    }

    public Etudiant addHistoriqueEtudiantModule(HistoriqueEtudiantModule historiqueEtudiantModule) {
        this.historiqueEtudiantModules.add(historiqueEtudiantModule);
        historiqueEtudiantModule.setEtudiant(this);
        return this;
    }

    public Etudiant removeHistoriqueEtudiantModule(HistoriqueEtudiantModule historiqueEtudiantModule) {
        this.historiqueEtudiantModules.remove(historiqueEtudiantModule);
        historiqueEtudiantModule.setEtudiant(null);
        return this;
    }

    public void setHistoriqueEtudiantModules(Set<HistoriqueEtudiantModule> historiqueEtudiantModules) {
        this.historiqueEtudiantModules = historiqueEtudiantModules;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public Etudiant modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public Etudiant addModule(Module module) {
        this.modules.add(module);
        module.getEtudiants().add(this);
        return this;
    }

    public Etudiant removeModule(Module module) {
        this.modules.remove(module);
        module.getEtudiants().remove(this);
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
        if (!(o instanceof Etudiant)) {
            return false;
        }
        return id != null && id.equals(((Etudiant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Etudiant{" +
            "id=" + getId() +
            ", tel=" + getTel() +
            ", cin='" + getCin() + "'" +
            ", etat='" + getEtat() + "'" +
            ", datenaissance='" + getDatenaissance() + "'" +
            ", semsetre=" + getSemsetre() +
            ", section='" + getSection() + "'" +
            ", promo=" + getPromo() +
            "}";
    }
}
