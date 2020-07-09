import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SequortalibSharedModule } from 'app/shared/shared.module';
import { HistoriqueEnseignantFiliereComponent } from './historique-enseignant-filiere.component';
import { HistoriqueEnseignantFiliereDetailComponent } from './historique-enseignant-filiere-detail.component';
import { HistoriqueEnseignantFiliereUpdateComponent } from './historique-enseignant-filiere-update.component';
import { HistoriqueEnseignantFiliereDeleteDialogComponent } from './historique-enseignant-filiere-delete-dialog.component';
import { historiqueEnseignantFiliereRoute } from './historique-enseignant-filiere.route';

@NgModule({
  imports: [SequortalibSharedModule, RouterModule.forChild(historiqueEnseignantFiliereRoute)],
  declarations: [
    HistoriqueEnseignantFiliereComponent,
    HistoriqueEnseignantFiliereDetailComponent,
    HistoriqueEnseignantFiliereUpdateComponent,
    HistoriqueEnseignantFiliereDeleteDialogComponent
  ],
  entryComponents: [HistoriqueEnseignantFiliereDeleteDialogComponent]
})
export class SequortalibHistoriqueEnseignantFiliereModule {}
