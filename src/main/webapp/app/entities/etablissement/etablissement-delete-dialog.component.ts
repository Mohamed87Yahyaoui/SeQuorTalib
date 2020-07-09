import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEtablissement } from 'app/shared/model/etablissement.model';
import { EtablissementService } from './etablissement.service';

@Component({
  templateUrl: './etablissement-delete-dialog.component.html'
})
export class EtablissementDeleteDialogComponent {
  etablissement?: IEtablissement;

  constructor(
    protected etablissementService: EtablissementService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.etablissementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('etablissementListModification');
      this.activeModal.close();
    });
  }
}
