package com.pfe.sequortalib.service;

import com.pfe.sequortalib.domain.HistoriqueEnseignantFiliere;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link HistoriqueEnseignantFiliere}.
 */
public interface HistoriqueEnseignantFiliereService {

    /**
     * Save a historiqueEnseignantFiliere.
     *
     * @param historiqueEnseignantFiliere the entity to save.
     * @return the persisted entity.
     */
    HistoriqueEnseignantFiliere save(HistoriqueEnseignantFiliere historiqueEnseignantFiliere);

    /**
     * Get all the historiqueEnseignantFilieres.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<HistoriqueEnseignantFiliere> findAll(Pageable pageable);

    /**
     * Get the "id" historiqueEnseignantFiliere.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<HistoriqueEnseignantFiliere> findOne(Long id);

    /**
     * Delete the "id" historiqueEnseignantFiliere.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
