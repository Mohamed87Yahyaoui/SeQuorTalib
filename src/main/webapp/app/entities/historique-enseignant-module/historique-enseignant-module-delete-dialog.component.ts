import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistoriqueEnseignantModule } from 'app/shared/model/historique-enseignant-module.model';
import { HistoriqueEnseignantModuleService } from './historique-enseignant-module.service';

@Component({
  templateUrl: './historique-enseignant-module-delete-dialog.component.html'
})
export class HistoriqueEnseignantModuleDeleteDialogComponent {
  historiqueEnseignantModule?: IHistoriqueEnseignantModule;

  constructor(
    protected historiqueEnseignantModuleService: HistoriqueEnseignantModuleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.historiqueEnseignantModuleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('historiqueEnseignantModuleListModification');
      this.activeModal.close();
    });
  }
}
