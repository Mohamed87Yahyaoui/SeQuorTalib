package com.pfe.sequortalib.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pfe.sequortalib.web.rest.TestUtil;

public class HistoriqueEtudiantModuleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistoriqueEtudiantModule.class);
        HistoriqueEtudiantModule historiqueEtudiantModule1 = new HistoriqueEtudiantModule();
        historiqueEtudiantModule1.setId(1L);
        HistoriqueEtudiantModule historiqueEtudiantModule2 = new HistoriqueEtudiantModule();
        historiqueEtudiantModule2.setId(historiqueEtudiantModule1.getId());
        assertThat(historiqueEtudiantModule1).isEqualTo(historiqueEtudiantModule2);
        historiqueEtudiantModule2.setId(2L);
        assertThat(historiqueEtudiantModule1).isNotEqualTo(historiqueEtudiantModule2);
        historiqueEtudiantModule1.setId(null);
        assertThat(historiqueEtudiantModule1).isNotEqualTo(historiqueEtudiantModule2);
    }
}
