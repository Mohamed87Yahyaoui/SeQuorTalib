package com.pfe.sequortalib.repository;

import com.pfe.sequortalib.domain.Enseignant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Enseignant entity.
 */
@Repository
public interface EnseignantRepository extends JpaRepository<Enseignant, Long> {

    @Query(value = "select distinct enseignant from Enseignant enseignant left join fetch enseignant.modules",
        countQuery = "select count(distinct enseignant) from Enseignant enseignant")
    Page<Enseignant> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct enseignant from Enseignant enseignant left join fetch enseignant.modules")
    List<Enseignant> findAllWithEagerRelationships();

    @Query("select enseignant from Enseignant enseignant left join fetch enseignant.modules where enseignant.id =:id")
    Optional<Enseignant> findOneWithEagerRelationships(@Param("id") Long id);
}
