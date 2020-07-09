package com.pfe.sequortalib.service;

import com.pfe.sequortalib.domain.Etablissement;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Etablissement}.
 */
public interface EtablissementService {

    /**
     * Save a etablissement.
     *
     * @param etablissement the entity to save.
     * @return the persisted entity.
     */
    Etablissement save(Etablissement etablissement);

    /**
     * Get all the etablissements.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Etablissement> findAll(Pageable pageable);

    /**
     * Get the "id" etablissement.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Etablissement> findOne(Long id);

    /**
     * Delete the "id" etablissement.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
