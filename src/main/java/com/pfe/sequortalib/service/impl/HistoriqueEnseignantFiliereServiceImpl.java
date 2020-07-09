package com.pfe.sequortalib.service.impl;

import com.pfe.sequortalib.service.HistoriqueEnseignantFiliereService;
import com.pfe.sequortalib.domain.HistoriqueEnseignantFiliere;
import com.pfe.sequortalib.repository.HistoriqueEnseignantFiliereRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link HistoriqueEnseignantFiliere}.
 */
@Service
@Transactional
public class HistoriqueEnseignantFiliereServiceImpl implements HistoriqueEnseignantFiliereService {

    private final Logger log = LoggerFactory.getLogger(HistoriqueEnseignantFiliereServiceImpl.class);

    private final HistoriqueEnseignantFiliereRepository historiqueEnseignantFiliereRepository;

    public HistoriqueEnseignantFiliereServiceImpl(HistoriqueEnseignantFiliereRepository historiqueEnseignantFiliereRepository) {
        this.historiqueEnseignantFiliereRepository = historiqueEnseignantFiliereRepository;
    }

    /**
     * Save a historiqueEnseignantFiliere.
     *
     * @param historiqueEnseignantFiliere the entity to save.
     * @return the persisted entity.
     */
    @Override
    public HistoriqueEnseignantFiliere save(HistoriqueEnseignantFiliere historiqueEnseignantFiliere) {
        log.debug("Request to save HistoriqueEnseignantFiliere : {}", historiqueEnseignantFiliere);
        return historiqueEnseignantFiliereRepository.save(historiqueEnseignantFiliere);
    }

    /**
     * Get all the historiqueEnseignantFilieres.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<HistoriqueEnseignantFiliere> findAll(Pageable pageable) {
        log.debug("Request to get all HistoriqueEnseignantFilieres");
        return historiqueEnseignantFiliereRepository.findAll(pageable);
    }

    /**
     * Get one historiqueEnseignantFiliere by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<HistoriqueEnseignantFiliere> findOne(Long id) {
        log.debug("Request to get HistoriqueEnseignantFiliere : {}", id);
        return historiqueEnseignantFiliereRepository.findById(id);
    }

    /**
     * Delete the historiqueEnseignantFiliere by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete HistoriqueEnseignantFiliere : {}", id);
        historiqueEnseignantFiliereRepository.deleteById(id);
    }
}
