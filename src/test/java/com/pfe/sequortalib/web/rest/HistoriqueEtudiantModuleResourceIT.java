package com.pfe.sequortalib.web.rest;

import com.pfe.sequortalib.SequortalibApp;
import com.pfe.sequortalib.domain.HistoriqueEtudiantModule;
import com.pfe.sequortalib.repository.HistoriqueEtudiantModuleRepository;
import com.pfe.sequortalib.service.HistoriqueEtudiantModuleService;

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
 * Integration tests for the {@link HistoriqueEtudiantModuleResource} REST controller.
 */
@SpringBootTest(classes = SequortalibApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class HistoriqueEtudiantModuleResourceIT {

    private static final LocalDate DEFAULT_DATEDEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEDEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATEFIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEFIN = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private HistoriqueEtudiantModuleRepository historiqueEtudiantModuleRepository;

    @Autowired
    private HistoriqueEtudiantModuleService historiqueEtudiantModuleService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHistoriqueEtudiantModuleMockMvc;

    private HistoriqueEtudiantModule historiqueEtudiantModule;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoriqueEtudiantModule createEntity(EntityManager em) {
        HistoriqueEtudiantModule historiqueEtudiantModule = new HistoriqueEtudiantModule()
            .datedebut(DEFAULT_DATEDEBUT)
            .datefin(DEFAULT_DATEFIN);
        return historiqueEtudiantModule;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoriqueEtudiantModule createUpdatedEntity(EntityManager em) {
        HistoriqueEtudiantModule historiqueEtudiantModule = new HistoriqueEtudiantModule()
            .datedebut(UPDATED_DATEDEBUT)
            .datefin(UPDATED_DATEFIN);
        return historiqueEtudiantModule;
    }

    @BeforeEach
    public void initTest() {
        historiqueEtudiantModule = createEntity(em);
    }

    @Test
    @Transactional
    public void createHistoriqueEtudiantModule() throws Exception {
        int databaseSizeBeforeCreate = historiqueEtudiantModuleRepository.findAll().size();

        // Create the HistoriqueEtudiantModule
        restHistoriqueEtudiantModuleMockMvc.perform(post("/api/historique-etudiant-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEtudiantModule)))
            .andExpect(status().isCreated());

        // Validate the HistoriqueEtudiantModule in the database
        List<HistoriqueEtudiantModule> historiqueEtudiantModuleList = historiqueEtudiantModuleRepository.findAll();
        assertThat(historiqueEtudiantModuleList).hasSize(databaseSizeBeforeCreate + 1);
        HistoriqueEtudiantModule testHistoriqueEtudiantModule = historiqueEtudiantModuleList.get(historiqueEtudiantModuleList.size() - 1);
        assertThat(testHistoriqueEtudiantModule.getDatedebut()).isEqualTo(DEFAULT_DATEDEBUT);
        assertThat(testHistoriqueEtudiantModule.getDatefin()).isEqualTo(DEFAULT_DATEFIN);
    }

    @Test
    @Transactional
    public void createHistoriqueEtudiantModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = historiqueEtudiantModuleRepository.findAll().size();

        // Create the HistoriqueEtudiantModule with an existing ID
        historiqueEtudiantModule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistoriqueEtudiantModuleMockMvc.perform(post("/api/historique-etudiant-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEtudiantModule)))
            .andExpect(status().isBadRequest());

        // Validate the HistoriqueEtudiantModule in the database
        List<HistoriqueEtudiantModule> historiqueEtudiantModuleList = historiqueEtudiantModuleRepository.findAll();
        assertThat(historiqueEtudiantModuleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDatedebutIsRequired() throws Exception {
        int databaseSizeBeforeTest = historiqueEtudiantModuleRepository.findAll().size();
        // set the field null
        historiqueEtudiantModule.setDatedebut(null);

        // Create the HistoriqueEtudiantModule, which fails.

        restHistoriqueEtudiantModuleMockMvc.perform(post("/api/historique-etudiant-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEtudiantModule)))
            .andExpect(status().isBadRequest());

        List<HistoriqueEtudiantModule> historiqueEtudiantModuleList = historiqueEtudiantModuleRepository.findAll();
        assertThat(historiqueEtudiantModuleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHistoriqueEtudiantModules() throws Exception {
        // Initialize the database
        historiqueEtudiantModuleRepository.saveAndFlush(historiqueEtudiantModule);

        // Get all the historiqueEtudiantModuleList
        restHistoriqueEtudiantModuleMockMvc.perform(get("/api/historique-etudiant-modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historiqueEtudiantModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].datedebut").value(hasItem(DEFAULT_DATEDEBUT.toString())))
            .andExpect(jsonPath("$.[*].datefin").value(hasItem(DEFAULT_DATEFIN.toString())));
    }
    
    @Test
    @Transactional
    public void getHistoriqueEtudiantModule() throws Exception {
        // Initialize the database
        historiqueEtudiantModuleRepository.saveAndFlush(historiqueEtudiantModule);

        // Get the historiqueEtudiantModule
        restHistoriqueEtudiantModuleMockMvc.perform(get("/api/historique-etudiant-modules/{id}", historiqueEtudiantModule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(historiqueEtudiantModule.getId().intValue()))
            .andExpect(jsonPath("$.datedebut").value(DEFAULT_DATEDEBUT.toString()))
            .andExpect(jsonPath("$.datefin").value(DEFAULT_DATEFIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHistoriqueEtudiantModule() throws Exception {
        // Get the historiqueEtudiantModule
        restHistoriqueEtudiantModuleMockMvc.perform(get("/api/historique-etudiant-modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHistoriqueEtudiantModule() throws Exception {
        // Initialize the database
        historiqueEtudiantModuleService.save(historiqueEtudiantModule);

        int databaseSizeBeforeUpdate = historiqueEtudiantModuleRepository.findAll().size();

        // Update the historiqueEtudiantModule
        HistoriqueEtudiantModule updatedHistoriqueEtudiantModule = historiqueEtudiantModuleRepository.findById(historiqueEtudiantModule.getId()).get();
        // Disconnect from session so that the updates on updatedHistoriqueEtudiantModule are not directly saved in db
        em.detach(updatedHistoriqueEtudiantModule);
        updatedHistoriqueEtudiantModule
            .datedebut(UPDATED_DATEDEBUT)
            .datefin(UPDATED_DATEFIN);

        restHistoriqueEtudiantModuleMockMvc.perform(put("/api/historique-etudiant-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedHistoriqueEtudiantModule)))
            .andExpect(status().isOk());

        // Validate the HistoriqueEtudiantModule in the database
        List<HistoriqueEtudiantModule> historiqueEtudiantModuleList = historiqueEtudiantModuleRepository.findAll();
        assertThat(historiqueEtudiantModuleList).hasSize(databaseSizeBeforeUpdate);
        HistoriqueEtudiantModule testHistoriqueEtudiantModule = historiqueEtudiantModuleList.get(historiqueEtudiantModuleList.size() - 1);
        assertThat(testHistoriqueEtudiantModule.getDatedebut()).isEqualTo(UPDATED_DATEDEBUT);
        assertThat(testHistoriqueEtudiantModule.getDatefin()).isEqualTo(UPDATED_DATEFIN);
    }

    @Test
    @Transactional
    public void updateNonExistingHistoriqueEtudiantModule() throws Exception {
        int databaseSizeBeforeUpdate = historiqueEtudiantModuleRepository.findAll().size();

        // Create the HistoriqueEtudiantModule

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistoriqueEtudiantModuleMockMvc.perform(put("/api/historique-etudiant-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historiqueEtudiantModule)))
            .andExpect(status().isBadRequest());

        // Validate the HistoriqueEtudiantModule in the database
        List<HistoriqueEtudiantModule> historiqueEtudiantModuleList = historiqueEtudiantModuleRepository.findAll();
        assertThat(historiqueEtudiantModuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHistoriqueEtudiantModule() throws Exception {
        // Initialize the database
        historiqueEtudiantModuleService.save(historiqueEtudiantModule);

        int databaseSizeBeforeDelete = historiqueEtudiantModuleRepository.findAll().size();

        // Delete the historiqueEtudiantModule
        restHistoriqueEtudiantModuleMockMvc.perform(delete("/api/historique-etudiant-modules/{id}", historiqueEtudiantModule.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HistoriqueEtudiantModule> historiqueEtudiantModuleList = historiqueEtudiantModuleRepository.findAll();
        assertThat(historiqueEtudiantModuleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
