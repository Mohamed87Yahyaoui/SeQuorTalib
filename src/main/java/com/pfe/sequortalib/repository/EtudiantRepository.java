package com.pfe.sequortalib.repository;

import com.pfe.sequortalib.domain.Etudiant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Etudiant entity.
 */
@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {

    @Query(value = "select distinct etudiant from Etudiant etudiant left join fetch etudiant.modules",
        countQuery = "select count(distinct etudiant) from Etudiant etudiant")
    Page<Etudiant> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct etudiant from Etudiant etudiant left join fetch etudiant.modules")
    List<Etudiant> findAllWithEagerRelationships();

    @Query("select etudiant from Etudiant etudiant left join fetch etudiant.modules where etudiant.id =:id")
    Optional<Etudiant> findOneWithEagerRelationships(@Param("id") Long id);
}
