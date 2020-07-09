import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEtudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from './etudiant.service';

@Component({
  templateUrl: './etudiant-delete-dialog.component.html'
})
export class EtudiantDeleteDialogComponent {
  etudiant?: IEtudiant;

  constructor(protected etudiantService: EtudiantService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.etudiantService.delete(id).subscribe(() => {
      this.eventManager.broadcast('etudiantListModification');
      this.activeModal.close();
    });
  }
}
