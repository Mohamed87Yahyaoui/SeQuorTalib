import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistoriqueEnseignantFiliere } from 'app/shared/model/historique-enseignant-filiere.model';
import { HistoriqueEnseignantFiliereService } from './historique-enseignant-filiere.service';

@Component({
  templateUrl: './historique-enseignant-filiere-delete-dialog.component.html'
})
export class HistoriqueEnseignantFiliereDeleteDialogComponent {
  historiqueEnseignantFiliere?: IHistoriqueEnseignantFiliere;

  constructor(
    protected historiqueEnseignantFiliereService: HistoriqueEnseignantFiliereService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.historiqueEnseignantFiliereService.delete(id).subscribe(() => {
      this.eventManager.broadcast('historiqueEnseignantFiliereListModification');
      this.activeModal.close();
    });
  }
}
