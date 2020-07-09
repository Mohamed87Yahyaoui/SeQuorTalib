package com.pfe.sequortalib.web.rest;

import com.pfe.sequortalib.SequortalibApp;
import com.pfe.sequortalib.domain.HistoriqueEtudiantFiliere;
import com.pfe.sequortalib.repository.HistoriqueEtudiantFiliereRepository;
import com.pfe.sequortalib.service.HistoriqueEtudiantFiliereService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link HistoriqueEtudiantFiliereResource} REST controller.
 */
@SpringBootTest(classes = SequortalibApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class HistoriqueEtudiantFiliereResourceIT {

    private static final LocalDate DEFAULT_DATEDEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEDEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATEFIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEFIN = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private HistoriqueEtudiantFiliereRepository historiqueEtudiantFiliereRepository;

    @Autowired
    private HistoriqueEtudiantFiliereService historiqueEtudiantFiliereService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHistoriqueEtudiantFiliereMockMvc;

    private HistoriqueEtudiantFiliere historiqueEtudiantFiliere;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoriqueEtudiantFiliere createEntity(EntityManager em) {
        HistoriqueEtudiantFiliere historiqueEtudiantFiliere = new HistoriqueEtudiantFiliere()
            .datedebut(DEFAULT_DATEDEBUT)
            .datefin(DEFAULT_DATEFIN);
        return historiqueEtudiantFiliere;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoriqueEtudiantFiliere createUpdatedEntity(EntityManager em) {
        HistoriqueEtudiantFiliere historiqueEtudiantFiliere = new HistoriqueEtudiantFiliere()
            .datedebut(UPDATED_DATEDEBUT)
            .datefin(UPDATED_DATEFIN);
        return historiqueEtudiantFiliere;
    }

    @BeforeEach
    public void initTest() {
        historiqueEtudiantFiliere = createEntity(em);
    }

    @Test
    @Transactional
    public void createHistoriqueEtudiantFiliere() throws Exception {
        int databaseSizeBeforeCreate = historiqueEtudiantFiliereRepository.findAll().size();

        // Create the HistoriqueEtudiantFiliere
        restHistoriqueEtudiantFiliereMockMvc.perform(post("/api/historique-etudiant-filieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEtudiantFiliere)))
            .andExpect(status().isCreated());

        // Validate the HistoriqueEtudiantFiliere in the database
        List<HistoriqueEtudiantFiliere> historiqueEtudiantFiliereList = historiqueEtudiantFiliereRepository.findAll();
        assertThat(historiqueEtudiantFiliereList).hasSize(databaseSizeBeforeCreate + 1);
        HistoriqueEtudiantFiliere testHistoriqueEtudiantFiliere = historiqueEtudiantFiliereList.get(historiqueEtudiantFiliereList.size() - 1);
        assertThat(testHistoriqueEtudiantFiliere.getDatedebut()).isEqualTo(DEFAULT_DATEDEBUT);
        assertThat(testHistoriqueEtudiantFiliere.getDatefin()).isEqualTo(DEFAULT_DATEFIN);
    }

    @Test
    @Transactional
    public void createHistoriqueEtudiantFiliereWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = historiqueEtudiantFiliereRepository.findAll().size();

        // Create the HistoriqueEtudiantFiliere with an existing ID
        historiqueEtudiantFiliere.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistoriqueEtudiantFiliereMockMvc.perform(post("/api/historique-etudiant-filieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEtudiantFiliere)))
            .andExpect(status().isBadRequest());

        // Validate the HistoriqueEtudiantFiliere in the database
        List<HistoriqueEtudiantFiliere> historiqueEtudiantFiliereList = historiqueEtudiantFiliereRepository.findAll();
        assertThat(historiqueEtudiantFiliereList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDatedebutIsRequired() throws Exception {
        int databaseSizeBeforeTest = historiqueEtudiantFiliereRepository.findAll().size();
        // set the field null
        historiqueEtudiantFiliere.setDatedebut(null);

        // Create the HistoriqueEtudiantFiliere, which fails.

        restHistoriqueEtudiantFiliereMockMvc.perform(post("/api/historique-etudiant-filieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEtudiantFiliere)))
            .andExpect(status().isBadRequest());

        List<HistoriqueEtudiantFiliere> historiqueEtudiantFiliereList = historiqueEtudiantFiliereRepository.findAll();
        assertThat(historiqueEtudiantFiliereList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHistoriqueEtudiantFilieres() throws Exception {
        // Initialize the database
        historiqueEtudiantFiliereRepository.saveAndFlush(historiqueEtudiantFiliere);

        // Get all the historiqueEtudiantFiliereList
        restHistoriqueEtudiantFiliereMockMvc.perform(get("/api/historique-etudiant-filieres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historiqueEtudiantFiliere.getId().intValue())))
            .andExpect(jsonPath("$.[*].datedebut").value(hasItem(DEFAULT_DATEDEBUT.toString())))
            .andExpect(jsonPath("$.[*].datefin").value(hasItem(DEFAULT_DATEFIN.toString())));
    }
    
    @Test
    @Transactional
    public void getHistoriqueEtudiantFiliere() throws Exception {
        // Initialize the database
        historiqueEtudiantFiliereRepository.saveAndFlush(historiqueEtudiantFiliere);

        // Get the historiqueEtudiantFiliere
        restHistoriqueEtudiantFiliereMockMvc.perform(get("/api/historique-etudiant-filieres/{id}", historiqueEtudiantFiliere.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(historiqueEtudiantFiliere.getId().intValue()))
            .andExpect(jsonPath("$.datedebut").value(DEFAULT_DATEDEBUT.toString()))
            .andExpect(jsonPath("$.datefin").value(DEFAULT_DATEFIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHistoriqueEtudiantFiliere() throws Exception {
        // Get the historiqueEtudiantFiliere
        restHistoriqueEtudiantFiliereMockMvc.perform(get("/api/historique-etudiant-filieres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHistoriqueEtudiantFiliere() throws Exception {
        // Initialize the database
        historiqueEtudiantFiliereService.save(historiqueEtudiantFiliere);

        int databaseSizeBeforeUpdate = historiqueEtudiantFiliereRepository.findAll().size();

        // Update the historiqueEtudiantFiliere
        HistoriqueEtudiantFiliere updatedHistoriqueEtudiantFiliere = historiqueEtudiantFiliereRepository.findById(historiqueEtudiantFiliere.getId()).get();
        // Disconnect from session so that the updates on updatedHistoriqueEtudiantFiliere are not directly saved in db
        em.detach(updatedHistoriqueEtudiantFiliere);
        updatedHistoriqueEtudiantFiliere
            .datedebut(UPDATED_DATEDEBUT)
            .datefin(UPDATED_DATEFIN);

        restHistoriqueEtudiantFiliereMockMvc.perform(put("/api/historique-etudiant-filieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedHistoriqueEtudiantFiliere)))
            .andExpect(status().isOk());

        // Validate the HistoriqueEtudiantFiliere in the database
        List<HistoriqueEtudiantFiliere> historiqueEtudiantFiliereList = historiqueEtudiantFiliereRepository.findAll();
        assertThat(historiqueEtudiantFiliereList).hasSize(databaseSizeBeforeUpdate);
        HistoriqueEtudiantFiliere testHistoriqueEtudiantFiliere = historiqueEtudiantFiliereList.get(historiqueEtudiantFiliereList.size() - 1);
        assertThat(testHistoriqueEtudiantFiliere.getDatedebut()).isEqualTo(UPDATED_DATEDEBUT);
        assertThat(testHistoriqueEtudiantFiliere.getDatefin()).isEqualTo(UPDATED_DATEFIN);
    }

    @Test
    @Transactional
    public void updateNonExistingHistoriqueEtudiantFiliere() throws Exception {
        int databaseSizeBeforeUpdate = historiqueEtudiantFiliereRepository.findAll().size();

        // Create the HistoriqueEtudiantFiliere

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistoriqueEtudiantFiliereMockMvc.perform(put("/api/historique-etudiant-filieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEtudiantFiliere)))
            .andExpect(status().isBadRequest());

        // Validate the HistoriqueEtudiantFiliere in the database
        List<HistoriqueEtudiantFiliere> historiqueEtudiantFiliereList = historiqueEtudiantFiliereRepository.findAll();
        assertThat(historiqueEtudiantFiliereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHistoriqueEtudiantFiliere() throws Exception {
        // Initialize the database
        historiqueEtudiantFiliereService.save(historiqueEtudiantFiliere);

        int databaseSizeBeforeDelete = historiqueEtudiantFiliereRepository.findAll().size();

        // Delete the historiqueEtudiantFiliere
        restHistoriqueEtudiantFiliereMockMvc.perform(delete("/api/historique-etudiant-filieres/{id}", historiqueEtudiantFiliere.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HistoriqueEtudiantFiliere> historiqueEtudiantFiliereList = historiqueEtudiantFiliereRepository.findAll();
        assertThat(historiqueEtudiantFiliereList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
