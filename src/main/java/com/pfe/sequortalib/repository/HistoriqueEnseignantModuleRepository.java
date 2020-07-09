package com.pfe.sequortalib.repository;

import com.pfe.sequortalib.domain.HistoriqueEnseignantModule;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the HistoriqueEnseignantModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistoriqueEnseignantModuleRepository extends JpaRepository<HistoriqueEnseignantModule, Long> {
}
