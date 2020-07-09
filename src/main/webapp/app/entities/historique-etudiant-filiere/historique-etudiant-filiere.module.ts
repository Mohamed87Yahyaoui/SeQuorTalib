import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SequortalibSharedModule } from 'app/shared/shared.module';
import { HistoriqueEtudiantFiliereComponent } from './historique-etudiant-filiere.component';
import { HistoriqueEtudiantFiliereDetailComponent } from './historique-etudiant-filiere-detail.component';
import { HistoriqueEtudiantFiliereUpdateComponent } from './historique-etudiant-filiere-update.component';
import { HistoriqueEtudiantFiliereDeleteDialogComponent } from './historique-etudiant-filiere-delete-dialog.component';
import { historiqueEtudiantFiliereRoute } from './historique-etudiant-filiere.route';

@NgModule({
  imports: [SequortalibSharedModule, RouterModule.forChild(historiqueEtudiantFiliereRoute)],
  declarations: [
    HistoriqueEtudiantFiliereComponent,
    HistoriqueEtudiantFiliereDetailComponent,
    HistoriqueEtudiantFiliereUpdateComponent,
    HistoriqueEtudiantFiliereDeleteDialogComponent
  ],
  entryComponents: [HistoriqueEtudiantFiliereDeleteDialogComponent]
})
export class SequortalibHistoriqueEtudiantFiliereModule {}
