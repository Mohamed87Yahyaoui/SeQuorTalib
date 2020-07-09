package com.pfe.sequortalib.service;

import com.pfe.sequortalib.domain.Filiere;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Filiere}.
 */
public interface FiliereService {

    /**
     * Save a filiere.
     *
     * @param filiere the entity to save.
     * @return the persisted entity.
     */
    Filiere save(Filiere filiere);

    /**
     * Get all the filieres.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Filiere> findAll(Pageable pageable);

    /**
     * Get all the filieres with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Filiere> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" filiere.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Filiere> findOne(Long id);

    /**
     * Delete the "id" filiere.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
