package com.pfe.sequortalib.repository;

import com.pfe.sequortalib.domain.Module;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Module entity.
 */
@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {

    @Query(value = "select distinct module from Module module left join fetch module.enseignants",
        countQuery = "select count(distinct module) from Module module")
    Page<Module> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct module from Module module left join fetch module.enseignants")
    List<Module> findAllWithEagerRelationships();

    @Query("select module from Module module left join fetch module.enseignants where module.id =:id")
    Optional<Module> findOneWithEagerRelationships(@Param("id") Long id);
}
