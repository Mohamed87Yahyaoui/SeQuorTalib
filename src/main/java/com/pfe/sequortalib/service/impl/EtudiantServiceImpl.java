package com.pfe.sequortalib.service.impl;

import com.pfe.sequortalib.service.EtudiantService;
import com.pfe.sequortalib.domain.Etudiant;
import com.pfe.sequortalib.repository.EtudiantRepository;
import com.pfe.sequortalib.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Etudiant}.
 */
@Service
@Transactional
public class EtudiantServiceImpl implements EtudiantService {

    private final Logger log = LoggerFactory.getLogger(EtudiantServiceImpl.class);

    private final EtudiantRepository etudiantRepository;

    private final UserRepository userRepository;

    public EtudiantServiceImpl(EtudiantRepository etudiantRepository, UserRepository userRepository) {
        this.etudiantRepository = etudiantRepository;
        this.userRepository = userRepository;
    }

    /**
     * Save a etudiant.
     *
     * @param etudiant the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Etudiant save(Etudiant etudiant) {
        log.debug("Request to save Etudiant : {}", etudiant);
        long userId = etudiant.getUser().getId();
        userRepository.findById(userId).ifPresent(etudiant::user);
        return etudiantRepository.save(etudiant);
    }

    /**
     * Get all the etudiants.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Etudiant> findAll(Pageable pageable) {
        log.debug("Request to get all Etudiants");
        return etudiantRepository.findAll(pageable);
    }

    /**
     * Get one etudiant by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Etudiant> findOne(Long id) {
        log.debug("Request to get Etudiant : {}", id);
        return etudiantRepository.findById(id);
    }

    /**
     * Delete the etudiant by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Etudiant : {}", id);
        etudiantRepository.deleteById(id);
    }
}
