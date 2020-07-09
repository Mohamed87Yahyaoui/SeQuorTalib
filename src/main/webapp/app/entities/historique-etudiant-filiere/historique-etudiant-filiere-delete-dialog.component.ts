import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistoriqueEtudiantFiliere } from 'app/shared/model/historique-etudiant-filiere.model';
import { HistoriqueEtudiantFiliereService } from './historique-etudiant-filiere.service';

@Component({
  templateUrl: './historique-etudiant-filiere-delete-dialog.component.html'
})
export class HistoriqueEtudiantFiliereDeleteDialogComponent {
  historiqueEtudiantFiliere?: IHistoriqueEtudiantFiliere;

  constructor(
    protected historiqueEtudiantFiliereService: HistoriqueEtudiantFiliereService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.historiqueEtudiantFiliereService.delete(id).subscribe(() => {
      this.eventManager.broadcast('historiqueEtudiantFiliereListModification');
      this.activeModal.close();
    });
  }
}
