import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'module',
        loadChildren: () => import('./module/module.module').then(m => m.SequortalibModuleModule)
      },
      {
        path: 'filiere',
        loadChildren: () => import('./filiere/filiere.module').then(m => m.SequortalibFiliereModule)
      },
      {
        path: 'departement',
        loadChildren: () => import('./departement/departement.module').then(m => m.SequortalibDepartementModule)
      },
      {
        path: 'historique-enseignant-module',
        loadChildren: () =>
          import('./historique-enseignant-module/historique-enseignant-module.module').then(
            m => m.SequortalibHistoriqueEnseignantModuleModule
          )
      },
      {
        path: 'historique-etudiant-module',
        loadChildren: () =>
          import('./historique-etudiant-module/historique-etudiant-module.module').then(m => m.SequortalibHistoriqueEtudiantModuleModule)
      },
      {
        path: 'historique-enseignant-filiere',
        loadChildren: () =>
          import('./historique-enseignant-filiere/historique-enseignant-filiere.module').then(
            m => m.SequortalibHistoriqueEnseignantFiliereModule
          )
      },
      {
        path: 'historique-etudiant-filiere',
        loadChildren: () =>
          import('./historique-etudiant-filiere/historique-etudiant-filiere.module').then(m => m.SequortalibHistoriqueEtudiantFiliereModule)
      },
      {
        path: 'etablissement',
        loadChildren: () => import('./etablissement/etablissement.module').then(m => m.SequortalibEtablissementModule)
      },
      {
        path: 'etudiant',
        loadChildren: () => import('./etudiant/etudiant.module').then(m => m.SequortalibEtudiantModule)
      },
      {
        path: 'enseignant',
        loadChildren: () => import('./enseignant/enseignant.module').then(m => m.SequortalibEnseignantModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SequortalibEntityModule {}
