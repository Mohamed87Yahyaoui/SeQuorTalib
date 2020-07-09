package com.pfe.sequortalib.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pfe.sequortalib.web.rest.TestUtil;

public class HistoriqueEnseignantModuleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistoriqueEnseignantModule.class);
        HistoriqueEnseignantModule historiqueEnseignantModule1 = new HistoriqueEnseignantModule();
        historiqueEnseignantModule1.setId(1L);
        HistoriqueEnseignantModule historiqueEnseignantModule2 = new HistoriqueEnseignantModule();
        historiqueEnseignantModule2.setId(historiqueEnseignantModule1.getId());
        assertThat(historiqueEnseignantModule1).isEqualTo(historiqueEnseignantModule2);
        historiqueEnseignantModule2.setId(2L);
        assertThat(historiqueEnseignantModule1).isNotEqualTo(historiqueEnseignantModule2);
        historiqueEnseignantModule1.setId(null);
        assertThat(historiqueEnseignantModule1).isNotEqualTo(historiqueEnseignantModule2);
    }
}
