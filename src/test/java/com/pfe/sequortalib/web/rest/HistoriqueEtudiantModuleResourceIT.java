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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pfe.sequortalib.domain.enumeration.Valider;
import com.pfe.sequortalib.domain.enumeration.Typevalidation;
/**
 * Integration tests for the {@link HistoriqueEtudiantModuleResource} REST controller.
 */
@SpringBootTest(classes = SequortalibApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class HistoriqueEtudiantModuleResourceIT {

    private static final Float DEFAULT_NOTE = 1F;
    private static final Float UPDATED_NOTE = 2F;

    private static final Valider DEFAULT_VALIDATION = Valider.V;
    private static final Valider UPDATED_VALIDATION = Valider.NV;

    private static final Typevalidation DEFAULT_ETAT = Typevalidation.VCS;
    private static final Typevalidation UPDATED_ETAT = Typevalidation.VCA;

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
            .note(DEFAULT_NOTE)
            .validation(DEFAULT_VALIDATION)
            .etat(DEFAULT_ETAT);
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
            .note(UPDATED_NOTE)
            .validation(UPDATED_VALIDATION)
            .etat(UPDATED_ETAT);
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
        assertThat(testHistoriqueEtudiantModule.getNote()).isEqualTo(DEFAULT_NOTE);
        assertThat(testHistoriqueEtudiantModule.getValidation()).isEqualTo(DEFAULT_VALIDATION);
        assertThat(testHistoriqueEtudiantModule.getEtat()).isEqualTo(DEFAULT_ETAT);
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
    public void getAllHistoriqueEtudiantModules() throws Exception {
        // Initialize the database
        historiqueEtudiantModuleRepository.saveAndFlush(historiqueEtudiantModule);

        // Get all the historiqueEtudiantModuleList
        restHistoriqueEtudiantModuleMockMvc.perform(get("/api/historique-etudiant-modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historiqueEtudiantModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.doubleValue())))
            .andExpect(jsonPath("$.[*].validation").value(hasItem(DEFAULT_VALIDATION.toString())))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.toString())));
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
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.doubleValue()))
            .andExpect(jsonPath("$.validation").value(DEFAULT_VALIDATION.toString()))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.toString()));
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
            .note(UPDATED_NOTE)
            .validation(UPDATED_VALIDATION)
            .etat(UPDATED_ETAT);

        restHistoriqueEtudiantModuleMockMvc.perform(put("/api/historique-etudiant-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedHistoriqueEtudiantModule)))
            .andExpect(status().isOk());

        // Validate the HistoriqueEtudiantModule in the database
        List<HistoriqueEtudiantModule> historiqueEtudiantModuleList = historiqueEtudiantModuleRepository.findAll();
        assertThat(historiqueEtudiantModuleList).hasSize(databaseSizeBeforeUpdate);
        HistoriqueEtudiantModule testHistoriqueEtudiantModule = historiqueEtudiantModuleList.get(historiqueEtudiantModuleList.size() - 1);
        assertThat(testHistoriqueEtudiantModule.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testHistoriqueEtudiantModule.getValidation()).isEqualTo(UPDATED_VALIDATION);
        assertThat(testHistoriqueEtudiantModule.getEtat()).isEqualTo(UPDATED_ETAT);
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
