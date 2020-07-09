package com.pfe.sequortalib.service;

import com.pfe.sequortalib.domain.HistoriqueEtudiantFiliere;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link HistoriqueEtudiantFiliere}.
 */
public interface HistoriqueEtudiantFiliereService {

    /**
     * Save a historiqueEtudiantFiliere.
     *
     * @param historiqueEtudiantFiliere the entity to save.
     * @return the persisted entity.
     */
    HistoriqueEtudiantFiliere save(HistoriqueEtudiantFiliere historiqueEtudiantFiliere);

    /**
     * Get all the historiqueEtudiantFilieres.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<HistoriqueEtudiantFiliere> findAll(Pageable pageable);

    /**
     * Get the "id" historiqueEtudiantFiliere.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<HistoriqueEtudiantFiliere> findOne(Long id);

    /**
     * Delete the "id" historiqueEtudiantFiliere.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
