package com.pfe.sequortalib.service;

import com.pfe.sequortalib.domain.HistoriqueEtudiantModule;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link HistoriqueEtudiantModule}.
 */
public interface HistoriqueEtudiantModuleService {

    /**
     * Save a historiqueEtudiantModule.
     *
     * @param historiqueEtudiantModule the entity to save.
     * @return the persisted entity.
     */
    HistoriqueEtudiantModule save(HistoriqueEtudiantModule historiqueEtudiantModule);

    /**
     * Get all the historiqueEtudiantModules.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<HistoriqueEtudiantModule> findAll(Pageable pageable);

    /**
     * Get the "id" historiqueEtudiantModule.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<HistoriqueEtudiantModule> findOne(Long id);

    /**
     * Delete the "id" historiqueEtudiantModule.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
