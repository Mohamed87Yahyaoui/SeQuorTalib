package com.pfe.sequortalib.service.impl;

import com.pfe.sequortalib.service.EnseignantService;
import com.pfe.sequortalib.domain.Enseignant;
import com.pfe.sequortalib.repository.EnseignantRepository;
import com.pfe.sequortalib.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Enseignant}.
 */
@Service
@Transactional
public class EnseignantServiceImpl implements EnseignantService {

    private final Logger log = LoggerFactory.getLogger(EnseignantServiceImpl.class);

    private final EnseignantRepository enseignantRepository;

    private final UserRepository userRepository;

    public EnseignantServiceImpl(EnseignantRepository enseignantRepository, UserRepository userRepository) {
        this.enseignantRepository = enseignantRepository;
        this.userRepository = userRepository;
    }

    /**
     * Save a enseignant.
     *
     * @param enseignant the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Enseignant save(Enseignant enseignant) {
        log.debug("Request to save Enseignant : {}", enseignant);
        long userId = enseignant.getUser().getId();
        userRepository.findById(userId).ifPresent(enseignant::user);
        return enseignantRepository.save(enseignant);
    }

    /**
     * Get all the enseignants.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Enseignant> findAll(Pageable pageable) {
        log.debug("Request to get all Enseignants");
        return enseignantRepository.findAll(pageable);
    }

    /**
     * Get one enseignant by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Enseignant> findOne(Long id) {
        log.debug("Request to get Enseignant : {}", id);
        return enseignantRepository.findById(id);
    }

    /**
     * Delete the enseignant by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Enseignant : {}", id);
        enseignantRepository.deleteById(id);
    }
}
