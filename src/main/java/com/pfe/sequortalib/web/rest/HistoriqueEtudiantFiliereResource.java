package com.pfe.sequortalib.web.rest;

import com.pfe.sequortalib.domain.HistoriqueEtudiantFiliere;
import com.pfe.sequortalib.service.HistoriqueEtudiantFiliereService;
import com.pfe.sequortalib.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.pfe.sequortalib.domain.HistoriqueEtudiantFiliere}.
 */
@RestController
@RequestMapping("/api")
public class HistoriqueEtudiantFiliereResource {

    private final Logger log = LoggerFactory.getLogger(HistoriqueEtudiantFiliereResource.class);

    private static final String ENTITY_NAME = "historiqueEtudiantFiliere";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HistoriqueEtudiantFiliereService historiqueEtudiantFiliereService;

    public HistoriqueEtudiantFiliereResource(HistoriqueEtudiantFiliereService historiqueEtudiantFiliereService) {
        this.historiqueEtudiantFiliereService = historiqueEtudiantFiliereService;
    }

    /**
     * {@code POST  /historique-etudiant-filieres} : Create a new historiqueEtudiantFiliere.
     *
     * @param historiqueEtudiantFiliere the historiqueEtudiantFiliere to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new historiqueEtudiantFiliere, or with status {@code 400 (Bad Request)} if the historiqueEtudiantFiliere has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/historique-etudiant-filieres")
    public ResponseEntity<HistoriqueEtudiantFiliere> createHistoriqueEtudiantFiliere(@Valid @RequestBody HistoriqueEtudiantFiliere historiqueEtudiantFiliere) throws URISyntaxException {
        log.debug("REST request to save HistoriqueEtudiantFiliere : {}", historiqueEtudiantFiliere);
        if (historiqueEtudiantFiliere.getId() != null) {
            throw new BadRequestAlertException("A new historiqueEtudiantFiliere cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HistoriqueEtudiantFiliere result = historiqueEtudiantFiliereService.save(historiqueEtudiantFiliere);
        return ResponseEntity.created(new URI("/api/historique-etudiant-filieres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /historique-etudiant-filieres} : Updates an existing historiqueEtudiantFiliere.
     *
     * @param historiqueEtudiantFiliere the historiqueEtudiantFiliere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated historiqueEtudiantFiliere,
     * or with status {@code 400 (Bad Request)} if the historiqueEtudiantFiliere is not valid,
     * or with status {@code 500 (Internal Server Error)} if the historiqueEtudiantFiliere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/historique-etudiant-filieres")
    public ResponseEntity<HistoriqueEtudiantFiliere> updateHistoriqueEtudiantFiliere(@Valid @RequestBody HistoriqueEtudiantFiliere historiqueEtudiantFiliere) throws URISyntaxException {
        log.debug("REST request to update HistoriqueEtudiantFiliere : {}", historiqueEtudiantFiliere);
        if (historiqueEtudiantFiliere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HistoriqueEtudiantFiliere result = historiqueEtudiantFiliereService.save(historiqueEtudiantFiliere);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, historiqueEtudiantFiliere.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /historique-etudiant-filieres} : get all the historiqueEtudiantFilieres.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of historiqueEtudiantFilieres in body.
     */
    @GetMapping("/historique-etudiant-filieres")
    public ResponseEntity<List<HistoriqueEtudiantFiliere>> getAllHistoriqueEtudiantFilieres(Pageable pageable) {
        log.debug("REST request to get a page of HistoriqueEtudiantFilieres");
        Page<HistoriqueEtudiantFiliere> page = historiqueEtudiantFiliereService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /historique-etudiant-filieres/:id} : get the "id" historiqueEtudiantFiliere.
     *
     * @param id the id of the historiqueEtudiantFiliere to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the historiqueEtudiantFiliere, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/historique-etudiant-filieres/{id}")
    public ResponseEntity<HistoriqueEtudiantFiliere> getHistoriqueEtudiantFiliere(@PathVariable Long id) {
        log.debug("REST request to get HistoriqueEtudiantFiliere : {}", id);
        Optional<HistoriqueEtudiantFiliere> historiqueEtudiantFiliere = historiqueEtudiantFiliereService.findOne(id);
        return ResponseUtil.wrapOrNotFound(historiqueEtudiantFiliere);
    }

    /**
     * {@code DELETE  /historique-etudiant-filieres/:id} : delete the "id" historiqueEtudiantFiliere.
     *
     * @param id the id of the historiqueEtudiantFiliere to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/historique-etudiant-filieres/{id}")
    public ResponseEntity<Void> deleteHistoriqueEtudiantFiliere(@PathVariable Long id) {
        log.debug("REST request to delete HistoriqueEtudiantFiliere : {}", id);
        historiqueEtudiantFiliereService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
