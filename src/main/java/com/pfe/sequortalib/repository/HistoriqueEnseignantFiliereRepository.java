package com.pfe.sequortalib.repository;

import com.pfe.sequortalib.domain.HistoriqueEnseignantFiliere;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the HistoriqueEnseignantFiliere entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistoriqueEnseignantFiliereRepository extends JpaRepository<HistoriqueEnseignantFiliere, Long> {
}
