package com.pfe.sequortalib.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tel")
    private Integer tel;

    @NotNull
    @Column(name = "cin", nullable = false)
    private String cin;

    @NotNull
    @Column(name = "semsetre", nullable = false)
    private Integer semsetre;

    @NotNull
    @Column(name = "section", nullable = false)
    private String section;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "etat", nullable = false)
    private Status etat;

    @Column(name = "datenaissance")
    private LocalDate datenaissance;

    @ManyToOne
    @JsonIgnoreProperties("etudiants")
    private HistoriqueEtudiantFiliere historiqueEtudiantFiliere;

    @ManyToOne
    @JsonIgnoreProperties("etudiants")
    private Etablissement etablissement;

    @ManyToOne
    @JsonIgnoreProperties("etudiants")
    private HistoriqueEtudiantModule historiqueEtudiantModule;

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

    public HistoriqueEtudiantFiliere getHistoriqueEtudiantFiliere() {
        return historiqueEtudiantFiliere;
    }

    public Etudiant historiqueEtudiantFiliere(HistoriqueEtudiantFiliere historiqueEtudiantFiliere) {
        this.historiqueEtudiantFiliere = historiqueEtudiantFiliere;
        return this;
    }

    public void setHistoriqueEtudiantFiliere(HistoriqueEtudiantFiliere historiqueEtudiantFiliere) {
        this.historiqueEtudiantFiliere = historiqueEtudiantFiliere;
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

    public HistoriqueEtudiantModule getHistoriqueEtudiantModule() {
        return historiqueEtudiantModule;
    }

    public Etudiant historiqueEtudiantModule(HistoriqueEtudiantModule historiqueEtudiantModule) {
        this.historiqueEtudiantModule = historiqueEtudiantModule;
        return this;
    }

    public void setHistoriqueEtudiantModule(HistoriqueEtudiantModule historiqueEtudiantModule) {
        this.historiqueEtudiantModule = historiqueEtudiantModule;
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
            ", semsetre=" + getSemsetre() +
            ", section='" + getSection() + "'" +
            ", etat='" + getEtat() + "'" +
            ", datenaissance='" + getDatenaissance() + "'" +
            "}";
    }
}
