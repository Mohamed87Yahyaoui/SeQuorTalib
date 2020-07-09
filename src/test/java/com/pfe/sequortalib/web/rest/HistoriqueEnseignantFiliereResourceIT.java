package com.pfe.sequortalib.web.rest;

import com.pfe.sequortalib.SequortalibApp;
import com.pfe.sequortalib.domain.HistoriqueEnseignantFiliere;
import com.pfe.sequortalib.repository.HistoriqueEnseignantFiliereRepository;
import com.pfe.sequortalib.service.HistoriqueEnseignantFiliereService;

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
 * Integration tests for the {@link HistoriqueEnseignantFiliereResource} REST controller.
 */
@SpringBootTest(classes = SequortalibApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class HistoriqueEnseignantFiliereResourceIT {

    private static final LocalDate DEFAULT_DATEDEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEDEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATEFIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEFIN = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private HistoriqueEnseignantFiliereRepository historiqueEnseignantFiliereRepository;

    @Autowired
    private HistoriqueEnseignantFiliereService historiqueEnseignantFiliereService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHistoriqueEnseignantFiliereMockMvc;

    private HistoriqueEnseignantFiliere historiqueEnseignantFiliere;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoriqueEnseignantFiliere createEntity(EntityManager em) {
        HistoriqueEnseignantFiliere historiqueEnseignantFiliere = new HistoriqueEnseignantFiliere()
            .datedebut(DEFAULT_DATEDEBUT)
            .datefin(DEFAULT_DATEFIN);
        return historiqueEnseignantFiliere;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoriqueEnseignantFiliere createUpdatedEntity(EntityManager em) {
        HistoriqueEnseignantFiliere historiqueEnseignantFiliere = new HistoriqueEnseignantFiliere()
            .datedebut(UPDATED_DATEDEBUT)
            .datefin(UPDATED_DATEFIN);
        return historiqueEnseignantFiliere;
    }

    @BeforeEach
    public void initTest() {
        historiqueEnseignantFiliere = createEntity(em);
    }

    @Test
    @Transactional
    public void createHistoriqueEnseignantFiliere() throws Exception {
        int databaseSizeBeforeCreate = historiqueEnseignantFiliereRepository.findAll().size();

        // Create the HistoriqueEnseignantFiliere
        restHistoriqueEnseignantFiliereMockMvc.perform(post("/api/historique-enseignant-filieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEnseignantFiliere)))
            .andExpect(status().isCreated());

        // Validate the HistoriqueEnseignantFiliere in the database
        List<HistoriqueEnseignantFiliere> historiqueEnseignantFiliereList = historiqueEnseignantFiliereRepository.findAll();
        assertThat(historiqueEnseignantFiliereList).hasSize(databaseSizeBeforeCreate + 1);
        HistoriqueEnseignantFiliere testHistoriqueEnseignantFiliere = historiqueEnseignantFiliereList.get(historiqueEnseignantFiliereList.size() - 1);
        assertThat(testHistoriqueEnseignantFiliere.getDatedebut()).isEqualTo(DEFAULT_DATEDEBUT);
        assertThat(testHistoriqueEnseignantFiliere.getDatefin()).isEqualTo(DEFAULT_DATEFIN);
    }

    @Test
    @Transactional
    public void createHistoriqueEnseignantFiliereWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = historiqueEnseignantFiliereRepository.findAll().size();

        // Create the HistoriqueEnseignantFiliere with an existing ID
        historiqueEnseignantFiliere.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistoriqueEnseignantFiliereMockMvc.perform(post("/api/historique-enseignant-filieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEnseignantFiliere)))
            .andExpect(status().isBadRequest());

        // Validate the HistoriqueEnseignantFiliere in the database
        List<HistoriqueEnseignantFiliere> historiqueEnseignantFiliereList = historiqueEnseignantFiliereRepository.findAll();
        assertThat(historiqueEnseignantFiliereList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDatedebutIsRequired() throws Exception {
        int databaseSizeBeforeTest = historiqueEnseignantFiliereRepository.findAll().size();
        // set the field null
        historiqueEnseignantFiliere.setDatedebut(null);

        // Create the HistoriqueEnseignantFiliere, which fails.

        restHistoriqueEnseignantFiliereMockMvc.perform(post("/api/historique-enseignant-filieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEnseignantFiliere)))
            .andExpect(status().isBadRequest());

        List<HistoriqueEnseignantFiliere> historiqueEnseignantFiliereList = historiqueEnseignantFiliereRepository.findAll();
        assertThat(historiqueEnseignantFiliereList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHistoriqueEnseignantFilieres() throws Exception {
        // Initialize the database
        historiqueEnseignantFiliereRepository.saveAndFlush(historiqueEnseignantFiliere);

        // Get all the historiqueEnseignantFiliereList
        restHistoriqueEnseignantFiliereMockMvc.perform(get("/api/historique-enseignant-filieres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historiqueEnseignantFiliere.getId().intValue())))
            .andExpect(jsonPath("$.[*].datedebut").value(hasItem(DEFAULT_DATEDEBUT.toString())))
            .andExpect(jsonPath("$.[*].datefin").value(hasItem(DEFAULT_DATEFIN.toString())));
    }
    
    @Test
    @Transactional
    public void getHistoriqueEnseignantFiliere() throws Exception {
        // Initialize the database
        historiqueEnseignantFiliereRepository.saveAndFlush(historiqueEnseignantFiliere);

        // Get the historiqueEnseignantFiliere
        restHistoriqueEnseignantFiliereMockMvc.perform(get("/api/historique-enseignant-filieres/{id}", historiqueEnseignantFiliere.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(historiqueEnseignantFiliere.getId().intValue()))
            .andExpect(jsonPath("$.datedebut").value(DEFAULT_DATEDEBUT.toString()))
            .andExpect(jsonPath("$.datefin").value(DEFAULT_DATEFIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHistoriqueEnseignantFiliere() throws Exception {
        // Get the historiqueEnseignantFiliere
        restHistoriqueEnseignantFiliereMockMvc.perform(get("/api/historique-enseignant-filieres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHistoriqueEnseignantFiliere() throws Exception {
        // Initialize the database
        historiqueEnseignantFiliereService.save(historiqueEnseignantFiliere);

        int databaseSizeBeforeUpdate = historiqueEnseignantFiliereRepository.findAll().size();

        // Update the historiqueEnseignantFiliere
        HistoriqueEnseignantFiliere updatedHistoriqueEnseignantFiliere = historiqueEnseignantFiliereRepository.findById(historiqueEnseignantFiliere.getId()).get();
        // Disconnect from session so that the updates on updatedHistoriqueEnseignantFiliere are not directly saved in db
        em.detach(updatedHistoriqueEnseignantFiliere);
        updatedHistoriqueEnseignantFiliere
            .datedebut(UPDATED_DATEDEBUT)
            .datefin(UPDATED_DATEFIN);

        restHistoriqueEnseignantFiliereMockMvc.perform(put("/api/historique-enseignant-filieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedHistoriqueEnseignantFiliere)))
            .andExpect(status().isOk());

        // Validate the HistoriqueEnseignantFiliere in the database
        List<HistoriqueEnseignantFiliere> historiqueEnseignantFiliereList = historiqueEnseignantFiliereRepository.findAll();
        assertThat(historiqueEnseignantFiliereList).hasSize(databaseSizeBeforeUpdate);
        HistoriqueEnseignantFiliere testHistoriqueEnseignantFiliere = historiqueEnseignantFiliereList.get(historiqueEnseignantFiliereList.size() - 1);
        assertThat(testHistoriqueEnseignantFiliere.getDatedebut()).isEqualTo(UPDATED_DATEDEBUT);
        assertThat(testHistoriqueEnseignantFiliere.getDatefin()).isEqualTo(UPDATED_DATEFIN);
    }

    @Test
    @Transactional
    public void updateNonExistingHistoriqueEnseignantFiliere() throws Exception {
        int databaseSizeBeforeUpdate = historiqueEnseignantFiliereRepository.findAll().size();

        // Create the HistoriqueEnseignantFiliere

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistoriqueEnseignantFiliereMockMvc.perform(put("/api/historique-enseignant-filieres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEnseignantFiliere)))
            .andExpect(status().isBadRequest());

        // Validate the HistoriqueEnseignantFiliere in the database
        List<HistoriqueEnseignantFiliere> historiqueEnseignantFiliereList = historiqueEnseignantFiliereRepository.findAll();
        assertThat(historiqueEnseignantFiliereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHistoriqueEnseignantFiliere() throws Exception {
        // Initialize the database
        historiqueEnseignantFiliereService.save(historiqueEnseignantFiliere);

        int databaseSizeBeforeDelete = historiqueEnseignantFiliereRepository.findAll().size();

        // Delete the historiqueEnseignantFiliere
        restHistoriqueEnseignantFiliereMockMvc.perform(delete("/api/historique-enseignant-filieres/{id}", historiqueEnseignantFiliere.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HistoriqueEnseignantFiliere> historiqueEnseignantFiliereList = historiqueEnseignantFiliereRepository.findAll();
        assertThat(historiqueEnseignantFiliereList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
