package com.pfe.sequortalib.service;

import com.pfe.sequortalib.domain.Enseignant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Enseignant}.
 */
public interface EnseignantService {

    /**
     * Save a enseignant.
     *
     * @param enseignant the entity to save.
     * @return the persisted entity.
     */
    Enseignant save(Enseignant enseignant);

    /**
     * Get all the enseignants.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Enseignant> findAll(Pageable pageable);

    /**
     * Get all the enseignants with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Enseignant> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" enseignant.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Enseignant> findOne(Long id);

    /**
     * Delete the "id" enseignant.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
