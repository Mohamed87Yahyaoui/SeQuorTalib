package com.pfe.sequortalib.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pfe.sequortalib.web.rest.TestUtil;

public class EtudiantTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Etudiant.class);
        Etudiant etudiant1 = new Etudiant();
        etudiant1.setId(1L);
        Etudiant etudiant2 = new Etudiant();
        etudiant2.setId(etudiant1.getId());
        assertThat(etudiant1).isEqualTo(etudiant2);
        etudiant2.setId(2L);
        assertThat(etudiant1).isNotEqualTo(etudiant2);
        etudiant1.setId(null);
        assertThat(etudiant1).isNotEqualTo(etudiant2);
    }
}
