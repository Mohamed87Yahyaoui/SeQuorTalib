import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SequortalibSharedModule } from 'app/shared/shared.module';
import { HistoriqueEtudiantModuleComponent } from './historique-etudiant-module.component';
import { HistoriqueEtudiantModuleDetailComponent } from './historique-etudiant-module-detail.component';
import { HistoriqueEtudiantModuleUpdateComponent } from './historique-etudiant-module-update.component';
import { HistoriqueEtudiantModuleDeleteDialogComponent } from './historique-etudiant-module-delete-dialog.component';
import { historiqueEtudiantModuleRoute } from './historique-etudiant-module.route';

@NgModule({
  imports: [SequortalibSharedModule, RouterModule.forChild(historiqueEtudiantModuleRoute)],
  declarations: [
    HistoriqueEtudiantModuleComponent,
    HistoriqueEtudiantModuleDetailComponent,
    HistoriqueEtudiantModuleUpdateComponent,
    HistoriqueEtudiantModuleDeleteDialogComponent
  ],
  entryComponents: [HistoriqueEtudiantModuleDeleteDialogComponent]
})
export class SequortalibHistoriqueEtudiantModuleModule {}
