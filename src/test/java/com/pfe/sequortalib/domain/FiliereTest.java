package com.pfe.sequortalib.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pfe.sequortalib.web.rest.TestUtil;

public class FiliereTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Filiere.class);
        Filiere filiere1 = new Filiere();
        filiere1.setId(1L);
        Filiere filiere2 = new Filiere();
        filiere2.setId(filiere1.getId());
        assertThat(filiere1).isEqualTo(filiere2);
        filiere2.setId(2L);
        assertThat(filiere1).isNotEqualTo(filiere2);
        filiere1.setId(null);
        assertThat(filiere1).isNotEqualTo(filiere2);
    }
}
