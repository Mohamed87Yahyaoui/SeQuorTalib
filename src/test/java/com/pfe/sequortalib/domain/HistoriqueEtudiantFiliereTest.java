package com.pfe.sequortalib.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pfe.sequortalib.web.rest.TestUtil;

public class HistoriqueEtudiantFiliereTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistoriqueEtudiantFiliere.class);
        HistoriqueEtudiantFiliere historiqueEtudiantFiliere1 = new HistoriqueEtudiantFiliere();
        historiqueEtudiantFiliere1.setId(1L);
        HistoriqueEtudiantFiliere historiqueEtudiantFiliere2 = new HistoriqueEtudiantFiliere();
        historiqueEtudiantFiliere2.setId(historiqueEtudiantFiliere1.getId());
        assertThat(historiqueEtudiantFiliere1).isEqualTo(historiqueEtudiantFiliere2);
        historiqueEtudiantFiliere2.setId(2L);
        assertThat(historiqueEtudiantFiliere1).isNotEqualTo(historiqueEtudiantFiliere2);
        historiqueEtudiantFiliere1.setId(null);
        assertThat(historiqueEtudiantFiliere1).isNotEqualTo(historiqueEtudiantFiliere2);
    }
}
