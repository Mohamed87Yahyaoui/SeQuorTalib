import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFiliere } from 'app/shared/model/filiere.model';
import { FiliereService } from './filiere.service';

@Component({
  templateUrl: './filiere-delete-dialog.component.html'
})
export class FiliereDeleteDialogComponent {
  filiere?: IFiliere;

  constructor(protected filiereService: FiliereService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.filiereService.delete(id).subscribe(() => {
      this.eventManager.broadcast('filiereListModification');
      this.activeModal.close();
    });
  }
}
