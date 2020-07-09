import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';
import { HistoriqueEtudiantModuleService } from './historique-etudiant-module.service';

@Component({
  templateUrl: './historique-etudiant-module-delete-dialog.component.html'
})
export class HistoriqueEtudiantModuleDeleteDialogComponent {
  historiqueEtudiantModule?: IHistoriqueEtudiantModule;

  constructor(
    protected historiqueEtudiantModuleService: HistoriqueEtudiantModuleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.historiqueEtudiantModuleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('historiqueEtudiantModuleListModification');
      this.activeModal.close();
    });
  }
}
