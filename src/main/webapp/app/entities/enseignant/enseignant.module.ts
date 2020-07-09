import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SequortalibSharedModule } from 'app/shared/shared.module';
import { EnseignantComponent } from './enseignant.component';
import { EnseignantDetailComponent } from './enseignant-detail.component';
import { EnseignantUpdateComponent } from './enseignant-update.component';
import { EnseignantDeleteDialogComponent } from './enseignant-delete-dialog.component';
import { enseignantRoute } from './enseignant.route';

@NgModule({
  imports: [SequortalibSharedModule, RouterModule.forChild(enseignantRoute)],
  declarations: [EnseignantComponent, EnseignantDetailComponent, EnseignantUpdateComponent, EnseignantDeleteDialogComponent],
  entryComponents: [EnseignantDeleteDialogComponent]
})
export class SequortalibEnseignantModule {}
