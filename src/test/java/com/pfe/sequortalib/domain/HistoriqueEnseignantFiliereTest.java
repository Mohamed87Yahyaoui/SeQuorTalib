package com.pfe.sequortalib.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pfe.sequortalib.web.rest.TestUtil;

public class HistoriqueEnseignantFiliereTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistoriqueEnseignantFiliere.class);
        HistoriqueEnseignantFiliere historiqueEnseignantFiliere1 = new HistoriqueEnseignantFiliere();
        historiqueEnseignantFiliere1.setId(1L);
        HistoriqueEnseignantFiliere historiqueEnseignantFiliere2 = new HistoriqueEnseignantFiliere();
        historiqueEnseignantFiliere2.setId(historiqueEnseignantFiliere1.getId());
        assertThat(historiqueEnseignantFiliere1).isEqualTo(historiqueEnseignantFiliere2);
        historiqueEnseignantFiliere2.setId(2L);
        assertThat(historiqueEnseignantFiliere1).isNotEqualTo(historiqueEnseignantFiliere2);
        historiqueEnseignantFiliere1.setId(null);
        assertThat(historiqueEnseignantFiliere1).isNotEqualTo(historiqueEnseignantFiliere2);
    }
}
