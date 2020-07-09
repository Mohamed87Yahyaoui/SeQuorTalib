import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from './departement.service';

@Component({
  templateUrl: './departement-delete-dialog.component.html'
})
export class DepartementDeleteDialogComponent {
  departement?: IDepartement;

  constructor(
    protected departementService: DepartementService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.departementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('departementListModification');
      this.activeModal.close();
    });
  }
}
