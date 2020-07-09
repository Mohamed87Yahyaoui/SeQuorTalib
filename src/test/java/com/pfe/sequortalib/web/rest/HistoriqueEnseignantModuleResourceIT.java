package com.pfe.sequortalib.web.rest;

import com.pfe.sequortalib.SequortalibApp;
import com.pfe.sequortalib.domain.HistoriqueEnseignantModule;
import com.pfe.sequortalib.repository.HistoriqueEnseignantModuleRepository;
import com.pfe.sequortalib.service.HistoriqueEnseignantModuleService;

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
 * Integration tests for the {@link HistoriqueEnseignantModuleResource} REST controller.
 */
@SpringBootTest(classes = SequortalibApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class HistoriqueEnseignantModuleResourceIT {

    private static final LocalDate DEFAULT_DATEDEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEDEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATEFIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEFIN = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private HistoriqueEnseignantModuleRepository historiqueEnseignantModuleRepository;

    @Autowired
    private HistoriqueEnseignantModuleService historiqueEnseignantModuleService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHistoriqueEnseignantModuleMockMvc;

    private HistoriqueEnseignantModule historiqueEnseignantModule;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoriqueEnseignantModule createEntity(EntityManager em) {
        HistoriqueEnseignantModule historiqueEnseignantModule = new HistoriqueEnseignantModule()
            .datedebut(DEFAULT_DATEDEBUT)
            .datefin(DEFAULT_DATEFIN);
        return historiqueEnseignantModule;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoriqueEnseignantModule createUpdatedEntity(EntityManager em) {
        HistoriqueEnseignantModule historiqueEnseignantModule = new HistoriqueEnseignantModule()
            .datedebut(UPDATED_DATEDEBUT)
            .datefin(UPDATED_DATEFIN);
        return historiqueEnseignantModule;
    }

    @BeforeEach
    public void initTest() {
        historiqueEnseignantModule = createEntity(em);
    }

    @Test
    @Transactional
    public void createHistoriqueEnseignantModule() throws Exception {
        int databaseSizeBeforeCreate = historiqueEnseignantModuleRepository.findAll().size();

        // Create the HistoriqueEnseignantModule
        restHistoriqueEnseignantModuleMockMvc.perform(post("/api/historique-enseignant-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEnseignantModule)))
            .andExpect(status().isCreated());

        // Validate the HistoriqueEnseignantModule in the database
        List<HistoriqueEnseignantModule> historiqueEnseignantModuleList = historiqueEnseignantModuleRepository.findAll();
        assertThat(historiqueEnseignantModuleList).hasSize(databaseSizeBeforeCreate + 1);
        HistoriqueEnseignantModule testHistoriqueEnseignantModule = historiqueEnseignantModuleList.get(historiqueEnseignantModuleList.size() - 1);
        assertThat(testHistoriqueEnseignantModule.getDatedebut()).isEqualTo(DEFAULT_DATEDEBUT);
        assertThat(testHistoriqueEnseignantModule.getDatefin()).isEqualTo(DEFAULT_DATEFIN);
    }

    @Test
    @Transactional
    public void createHistoriqueEnseignantModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = historiqueEnseignantModuleRepository.findAll().size();

        // Create the HistoriqueEnseignantModule with an existing ID
        historiqueEnseignantModule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistoriqueEnseignantModuleMockMvc.perform(post("/api/historique-enseignant-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEnseignantModule)))
            .andExpect(status().isBadRequest());

        // Validate the HistoriqueEnseignantModule in the database
        List<HistoriqueEnseignantModule> historiqueEnseignantModuleList = historiqueEnseignantModuleRepository.findAll();
        assertThat(historiqueEnseignantModuleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDatedebutIsRequired() throws Exception {
        int databaseSizeBeforeTest = historiqueEnseignantModuleRepository.findAll().size();
        // set the field null
        historiqueEnseignantModule.setDatedebut(null);

        // Create the HistoriqueEnseignantModule, which fails.

        restHistoriqueEnseignantModuleMockMvc.perform(post("/api/historique-enseignant-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEnseignantModule)))
            .andExpect(status().isBadRequest());

        List<HistoriqueEnseignantModule> historiqueEnseignantModuleList = historiqueEnseignantModuleRepository.findAll();
        assertThat(historiqueEnseignantModuleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHistoriqueEnseignantModules() throws Exception {
        // Initialize the database
        historiqueEnseignantModuleRepository.saveAndFlush(historiqueEnseignantModule);

        // Get all the historiqueEnseignantModuleList
        restHistoriqueEnseignantModuleMockMvc.perform(get("/api/historique-enseignant-modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historiqueEnseignantModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].datedebut").value(hasItem(DEFAULT_DATEDEBUT.toString())))
            .andExpect(jsonPath("$.[*].datefin").value(hasItem(DEFAULT_DATEFIN.toString())));
    }
    
    @Test
    @Transactional
    public void getHistoriqueEnseignantModule() throws Exception {
        // Initialize the database
        historiqueEnseignantModuleRepository.saveAndFlush(historiqueEnseignantModule);

        // Get the historiqueEnseignantModule
        restHistoriqueEnseignantModuleMockMvc.perform(get("/api/historique-enseignant-modules/{id}", historiqueEnseignantModule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(historiqueEnseignantModule.getId().intValue()))
            .andExpect(jsonPath("$.datedebut").value(DEFAULT_DATEDEBUT.toString()))
            .andExpect(jsonPath("$.datefin").value(DEFAULT_DATEFIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHistoriqueEnseignantModule() throws Exception {
        // Get the historiqueEnseignantModule
        restHistoriqueEnseignantModuleMockMvc.perform(get("/api/historique-enseignant-modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHistoriqueEnseignantModule() throws Exception {
        // Initialize the database
        historiqueEnseignantModuleService.save(historiqueEnseignantModule);

        int databaseSizeBeforeUpdate = historiqueEnseignantModuleRepository.findAll().size();

        // Update the historiqueEnseignantModule
        HistoriqueEnseignantModule updatedHistoriqueEnseignantModule = historiqueEnseignantModuleRepository.findById(historiqueEnseignantModule.getId()).get();
        // Disconnect from session so that the updates on updatedHistoriqueEnseignantModule are not directly saved in db
        em.detach(updatedHistoriqueEnseignantModule);
        updatedHistoriqueEnseignantModule
            .datedebut(UPDATED_DATEDEBUT)
            .datefin(UPDATED_DATEFIN);

        restHistoriqueEnseignantModuleMockMvc.perform(put("/api/historique-enseignant-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedHistoriqueEnseignantModule)))
            .andExpect(status().isOk());

        // Validate the HistoriqueEnseignantModule in the database
        List<HistoriqueEnseignantModule> historiqueEnseignantModuleList = historiqueEnseignantModuleRepository.findAll();
        assertThat(historiqueEnseignantModuleList).hasSize(databaseSizeBeforeUpdate);
        HistoriqueEnseignantModule testHistoriqueEnseignantModule = historiqueEnseignantModuleList.get(historiqueEnseignantModuleList.size() - 1);
        assertThat(testHistoriqueEnseignantModule.getDatedebut()).isEqualTo(UPDATED_DATEDEBUT);
        assertThat(testHistoriqueEnseignantModule.getDatefin()).isEqualTo(UPDATED_DATEFIN);
    }

    @Test
    @Transactional
    public void updateNonExistingHistoriqueEnseignantModule() throws Exception {
        int databaseSizeBeforeUpdate = historiqueEnseignantModuleRepository.findAll().size();

        // Create the HistoriqueEnseignantModule

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistoriqueEnseignantModuleMockMvc.perform(put("/api/historique-enseignant-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEnseignantModule)))
            .andExpect(status().isBadRequest());

        // Validate the HistoriqueEnseignantModule in the database
        List<HistoriqueEnseignantModule> historiqueEnseignantModuleList = historiqueEnseignantModuleRepository.findAll();
        assertThat(historiqueEnseignantModuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHistoriqueEnseignantModule() throws Exception {
        // Initialize the database
        historiqueEnseignantModuleService.save(historiqueEnseignantModule);

        int databaseSizeBeforeDelete = historiqueEnseignantModuleRepository.findAll().size();

        // Delete the historiqueEnseignantModule
        restHistoriqueEnseignantModuleMockMvc.perform(delete("/api/historique-enseignant-modules/{id}", historiqueEnseignantModule.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HistoriqueEnseignantModule> historiqueEnseignantModuleList = historiqueEnseignantModuleRepository.findAll();
        assertThat(historiqueEnseignantModuleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
