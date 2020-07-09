import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEnseignant } from 'app/shared/model/enseignant.model';
import { EnseignantService } from './enseignant.service';

@Component({
  templateUrl: './enseignant-delete-dialog.component.html'
})
export class EnseignantDeleteDialogComponent {
  enseignant?: IEnseignant;

  constructor(
    protected enseignantService: EnseignantService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.enseignantService.delete(id).subscribe(() => {
      this.eventManager.broadcast('enseignantListModification');
      this.activeModal.close();
    });
  }
}
