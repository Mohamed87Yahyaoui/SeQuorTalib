import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SequortalibSharedModule } from 'app/shared/shared.module';
import { EtablissementComponent } from './etablissement.component';
import { EtablissementDetailComponent } from './etablissement-detail.component';
import { EtablissementUpdateComponent } from './etablissement-update.component';
import { EtablissementDeleteDialogComponent } from './etablissement-delete-dialog.component';
import { etablissementRoute } from './etablissement.route';

@NgModule({
  imports: [SequortalibSharedModule, RouterModule.forChild(etablissementRoute)],
  declarations: [EtablissementComponent, EtablissementDetailComponent, EtablissementUpdateComponent, EtablissementDeleteDialogComponent],
  entryComponents: [EtablissementDeleteDialogComponent]
})
export class SequortalibEtablissementModule {}
