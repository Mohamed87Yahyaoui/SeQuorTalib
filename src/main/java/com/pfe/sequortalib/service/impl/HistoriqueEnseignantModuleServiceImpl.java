package com.pfe.sequortalib.service.impl;

import com.pfe.sequortalib.service.HistoriqueEnseignantModuleService;
import com.pfe.sequortalib.domain.HistoriqueEnseignantModule;
import com.pfe.sequortalib.repository.HistoriqueEnseignantModuleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link HistoriqueEnseignantModule}.
 */
@Service
@Transactional
public class HistoriqueEnseignantModuleServiceImpl implements HistoriqueEnseignantModuleService {

    private final Logger log = LoggerFactory.getLogger(HistoriqueEnseignantModuleServiceImpl.class);

    private final HistoriqueEnseignantModuleRepository historiqueEnseignantModuleRepository;

    public HistoriqueEnseignantModuleServiceImpl(HistoriqueEnseignantModuleRepository historiqueEnseignantModuleRepository) {
        this.historiqueEnseignantModuleRepository = historiqueEnseignantModuleRepository;
    }

    /**
     * Save a historiqueEnseignantModule.
     *
     * @param historiqueEnseignantModule the entity to save.
     * @return the persisted entity.
     */
    @Override
    public HistoriqueEnseignantModule save(HistoriqueEnseignantModule historiqueEnseignantModule) {
        log.debug("Request to save HistoriqueEnseignantModule : {}", historiqueEnseignantModule);
        return historiqueEnseignantModuleRepository.save(historiqueEnseignantModule);
    }

    /**
     * Get all the historiqueEnseignantModules.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<HistoriqueEnseignantModule> findAll(Pageable pageable) {
        log.debug("Request to get all HistoriqueEnseignantModules");
        return historiqueEnseignantModuleRepository.findAll(pageable);
    }

    /**
     * Get one historiqueEnseignantModule by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<HistoriqueEnseignantModule> findOne(Long id) {
        log.debug("Request to get HistoriqueEnseignantModule : {}", id);
        return historiqueEnseignantModuleRepository.findById(id);
    }

    /**
     * Delete the historiqueEnseignantModule by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete HistoriqueEnseignantModule : {}", id);
        historiqueEnseignantModuleRepository.deleteById(id);
    }
}
