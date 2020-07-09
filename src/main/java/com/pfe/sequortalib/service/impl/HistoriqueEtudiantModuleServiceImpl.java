package com.pfe.sequortalib.service.impl;

import com.pfe.sequortalib.service.HistoriqueEtudiantModuleService;
import com.pfe.sequortalib.domain.HistoriqueEtudiantModule;
import com.pfe.sequortalib.repository.HistoriqueEtudiantModuleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link HistoriqueEtudiantModule}.
 */
@Service
@Transactional
public class HistoriqueEtudiantModuleServiceImpl implements HistoriqueEtudiantModuleService {

    private final Logger log = LoggerFactory.getLogger(HistoriqueEtudiantModuleServiceImpl.class);

    private final HistoriqueEtudiantModuleRepository historiqueEtudiantModuleRepository;

    public HistoriqueEtudiantModuleServiceImpl(HistoriqueEtudiantModuleRepository historiqueEtudiantModuleRepository) {
        this.historiqueEtudiantModuleRepository = historiqueEtudiantModuleRepository;
    }

    /**
     * Save a historiqueEtudiantModule.
     *
     * @param historiqueEtudiantModule the entity to save.
     * @return the persisted entity.
     */
    @Override
    public HistoriqueEtudiantModule save(HistoriqueEtudiantModule historiqueEtudiantModule) {
        log.debug("Request to save HistoriqueEtudiantModule : {}", historiqueEtudiantModule);
        return historiqueEtudiantModuleRepository.save(historiqueEtudiantModule);
    }

    /**
     * Get all the historiqueEtudiantModules.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<HistoriqueEtudiantModule> findAll(Pageable pageable) {
        log.debug("Request to get all HistoriqueEtudiantModules");
        return historiqueEtudiantModuleRepository.findAll(pageable);
    }

    /**
     * Get one historiqueEtudiantModule by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<HistoriqueEtudiantModule> findOne(Long id) {
        log.debug("Request to get HistoriqueEtudiantModule : {}", id);
        return historiqueEtudiantModuleRepository.findById(id);
    }

    /**
     * Delete the historiqueEtudiantModule by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete HistoriqueEtudiantModule : {}", id);
        historiqueEtudiantModuleRepository.deleteById(id);
    }
}
