package com.pfe.sequortalib.repository;

import com.pfe.sequortalib.domain.Filiere;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Filiere entity.
 */
@Repository
public interface FiliereRepository extends JpaRepository<Filiere, Long> {

    @Query(value = "select distinct filiere from Filiere filiere left join fetch filiere.modules",
        countQuery = "select count(distinct filiere) from Filiere filiere")
    Page<Filiere> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct filiere from Filiere filiere left join fetch filiere.modules")
    List<Filiere> findAllWithEagerRelationships();

    @Query("select filiere from Filiere filiere left join fetch filiere.modules where filiere.id =:id")
    Optional<Filiere> findOneWithEagerRelationships(@Param("id") Long id);
}
