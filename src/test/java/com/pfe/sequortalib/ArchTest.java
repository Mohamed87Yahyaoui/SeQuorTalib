package com.pfe.sequortalib;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.pfe.sequortalib");

        noClasses()
            .that()
                .resideInAnyPackage("com.pfe.sequortalib.service..")
            .or()
                .resideInAnyPackage("com.pfe.sequortalib.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.pfe.sequortalib.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
