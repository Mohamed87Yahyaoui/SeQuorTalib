package com.pfe.sequortalib.web.rest;

import com.pfe.sequortalib.SequortalibApp;
import com.pfe.sequortalib.domain.Etudiant;
import com.pfe.sequortalib.domain.User;
import com.pfe.sequortalib.repository.EtudiantRepository;
import com.pfe.sequortalib.service.EtudiantService;

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

import com.pfe.sequortalib.domain.enumeration.Status;
/**
 * Integration tests for the {@link EtudiantResource} REST controller.
 */
@SpringBootTest(classes = SequortalibApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class EtudiantResourceIT {

    private static final Integer DEFAULT_TEL = 1;
    private static final Integer UPDATED_TEL = 2;

    private static final String DEFAULT_CIN = "AAAAAAAAAA";
    private static final String UPDATED_CIN = "BBBBBBBBBB";

    private static final Integer DEFAULT_SEMSETRE = 1;
    private static final Integer UPDATED_SEMSETRE = 2;

    private static final String DEFAULT_SECTION = "AAAAAAAAAA";
    private static final String UPDATED_SECTION = "BBBBBBBBBB";

    private static final Status DEFAULT_ETAT = Status.DIPLOME;
    private static final Status UPDATED_ETAT = Status.NONDIPLOME;

    private static final LocalDate DEFAULT_DATENAISSANCE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATENAISSANCE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_CODE_ETUDIANT = 1;
    private static final Integer UPDATED_CODE_ETUDIANT = 2;

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private EtudiantService etudiantService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEtudiantMockMvc;

    private Etudiant etudiant;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Etudiant createEntity(EntityManager em) {
        Etudiant etudiant = new Etudiant()
            .tel(DEFAULT_TEL)
            .cin(DEFAULT_CIN)
            .semsetre(DEFAULT_SEMSETRE)
            .section(DEFAULT_SECTION)
            .etat(DEFAULT_ETAT)
            .datenaissance(DEFAULT_DATENAISSANCE)
            .codeEtudiant(DEFAULT_CODE_ETUDIANT);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        etudiant.setUser(user);
        return etudiant;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Etudiant createUpdatedEntity(EntityManager em) {
        Etudiant etudiant = new Etudiant()
            .tel(UPDATED_TEL)
            .cin(UPDATED_CIN)
            .semsetre(UPDATED_SEMSETRE)
            .section(UPDATED_SECTION)
            .etat(UPDATED_ETAT)
            .datenaissance(UPDATED_DATENAISSANCE)
            .codeEtudiant(UPDATED_CODE_ETUDIANT);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        etudiant.setUser(user);
        return etudiant;
    }

    @BeforeEach
    public void initTest() {
        etudiant = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtudiant() throws Exception {
        int databaseSizeBeforeCreate = etudiantRepository.findAll().size();

        // Create the Etudiant
        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isCreated());

        // Validate the Etudiant in the database
        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeCreate + 1);
        Etudiant testEtudiant = etudiantList.get(etudiantList.size() - 1);
        assertThat(testEtudiant.getTel()).isEqualTo(DEFAULT_TEL);
        assertThat(testEtudiant.getCin()).isEqualTo(DEFAULT_CIN);
        assertThat(testEtudiant.getSemsetre()).isEqualTo(DEFAULT_SEMSETRE);
        assertThat(testEtudiant.getSection()).isEqualTo(DEFAULT_SECTION);
        assertThat(testEtudiant.getEtat()).isEqualTo(DEFAULT_ETAT);
        assertThat(testEtudiant.getDatenaissance()).isEqualTo(DEFAULT_DATENAISSANCE);
        assertThat(testEtudiant.getCodeEtudiant()).isEqualTo(DEFAULT_CODE_ETUDIANT);

        // Validate the id for MapsId, the ids must be same
        assertThat(testEtudiant.getId()).isEqualTo(testEtudiant.getUser().getId());
    }

    @Test
    @Transactional
    public void createEtudiantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etudiantRepository.findAll().size();

        // Create the Etudiant with an existing ID
        etudiant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        // Validate the Etudiant in the database
        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void updateEtudiantMapsIdAssociationWithNewId() throws Exception {
        // Initialize the database
        etudiantService.save(etudiant);
        int databaseSizeBeforeCreate = etudiantRepository.findAll().size();


        // Load the etudiant
        Etudiant updatedEtudiant = etudiantRepository.findById(etudiant.getId()).get();
        // Disconnect from session so that the updates on updatedEtudiant are not directly saved in db
        em.detach(updatedEtudiant);

        // Update the User with new association value
        //updatedEtudiant.setUser();

        // Update the entity
        restEtudiantMockMvc.perform(put("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEtudiant)))
            .andExpect(status().isOk());

        // Validate the Etudiant in the database
        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeCreate);
        Etudiant testEtudiant = etudiantList.get(etudiantList.size() - 1);

        // Validate the id for MapsId, the ids must be same
        // Uncomment the following line for assertion. However, please note that there is a known issue and uncommenting will fail the test.
        // Please look at https://github.com/jhipster/generator-jhipster/issues/9100. You can modify this test as necessary.
        // assertThat(testEtudiant.getId()).isEqualTo(testEtudiant.getUser().getId());
    }

    @Test
    @Transactional
    public void checkCinIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantRepository.findAll().size();
        // set the field null
        etudiant.setCin(null);

        // Create the Etudiant, which fails.

        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSemsetreIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantRepository.findAll().size();
        // set the field null
        etudiant.setSemsetre(null);

        // Create the Etudiant, which fails.

        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSectionIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantRepository.findAll().size();
        // set the field null
        etudiant.setSection(null);

        // Create the Etudiant, which fails.

        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEtatIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantRepository.findAll().size();
        // set the field null
        etudiant.setEtat(null);

        // Create the Etudiant, which fails.

        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodeEtudiantIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantRepository.findAll().size();
        // set the field null
        etudiant.setCodeEtudiant(null);

        // Create the Etudiant, which fails.

        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEtudiants() throws Exception {
        // Initialize the database
        etudiantRepository.saveAndFlush(etudiant);

        // Get all the etudiantList
        restEtudiantMockMvc.perform(get("/api/etudiants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etudiant.getId().intValue())))
            .andExpect(jsonPath("$.[*].tel").value(hasItem(DEFAULT_TEL)))
            .andExpect(jsonPath("$.[*].cin").value(hasItem(DEFAULT_CIN)))
            .andExpect(jsonPath("$.[*].semsetre").value(hasItem(DEFAULT_SEMSETRE)))
            .andExpect(jsonPath("$.[*].section").value(hasItem(DEFAULT_SECTION)))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.toString())))
            .andExpect(jsonPath("$.[*].datenaissance").value(hasItem(DEFAULT_DATENAISSANCE.toString())))
            .andExpect(jsonPath("$.[*].codeEtudiant").value(hasItem(DEFAULT_CODE_ETUDIANT)));
    }

    @Test
    @Transactional
    public void getEtudiant() throws Exception {
        // Initialize the database
        etudiantRepository.saveAndFlush(etudiant);

        // Get the etudiant
        restEtudiantMockMvc.perform(get("/api/etudiants/{id}", etudiant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(etudiant.getId().intValue()))
            .andExpect(jsonPath("$.tel").value(DEFAULT_TEL))
            .andExpect(jsonPath("$.cin").value(DEFAULT_CIN))
            .andExpect(jsonPath("$.semsetre").value(DEFAULT_SEMSETRE))
            .andExpect(jsonPath("$.section").value(DEFAULT_SECTION))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.toString()))
            .andExpect(jsonPath("$.datenaissance").value(DEFAULT_DATENAISSANCE.toString()))
            .andExpect(jsonPath("$.codeEtudiant").value(DEFAULT_CODE_ETUDIANT));
    }

    @Test
    @Transactional
    public void getNonExistingEtudiant() throws Exception {
        // Get the etudiant
        restEtudiantMockMvc.perform(get("/api/etudiants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtudiant() throws Exception {
        // Initialize the database
        etudiantService.save(etudiant);

        int databaseSizeBeforeUpdate = etudiantRepository.findAll().size();

        // Update the etudiant
        Etudiant updatedEtudiant = etudiantRepository.findById(etudiant.getId()).get();
        // Disconnect from session so that the updates on updatedEtudiant are not directly saved in db
        em.detach(updatedEtudiant);
        updatedEtudiant
            .tel(UPDATED_TEL)
            .cin(UPDATED_CIN)
            .semsetre(UPDATED_SEMSETRE)
            .section(UPDATED_SECTION)
            .etat(UPDATED_ETAT)
            .datenaissance(UPDATED_DATENAISSANCE)
            .codeEtudiant(UPDATED_CODE_ETUDIANT);

        restEtudiantMockMvc.perform(put("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEtudiant)))
            .andExpect(status().isOk());

        // Validate the Etudiant in the database
        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeUpdate);
        Etudiant testEtudiant = etudiantList.get(etudiantList.size() - 1);
        assertThat(testEtudiant.getTel()).isEqualTo(UPDATED_TEL);
        assertThat(testEtudiant.getCin()).isEqualTo(UPDATED_CIN);
        assertThat(testEtudiant.getSemsetre()).isEqualTo(UPDATED_SEMSETRE);
        assertThat(testEtudiant.getSection()).isEqualTo(UPDATED_SECTION);
        assertThat(testEtudiant.getEtat()).isEqualTo(UPDATED_ETAT);
        assertThat(testEtudiant.getDatenaissance()).isEqualTo(UPDATED_DATENAISSANCE);
        assertThat(testEtudiant.getCodeEtudiant()).isEqualTo(UPDATED_CODE_ETUDIANT);
    }

    @Test
    @Transactional
    public void updateNonExistingEtudiant() throws Exception {
        int databaseSizeBeforeUpdate = etudiantRepository.findAll().size();

        // Create the Etudiant

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEtudiantMockMvc.perform(put("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        // Validate the Etudiant in the database
        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEtudiant() throws Exception {
        // Initialize the database
        etudiantService.save(etudiant);

        int databaseSizeBeforeDelete = etudiantRepository.findAll().size();

        // Delete the etudiant
        restEtudiantMockMvc.perform(delete("/api/etudiants/{id}", etudiant.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
