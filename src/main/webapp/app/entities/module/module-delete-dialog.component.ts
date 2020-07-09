import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from './module.service';

@Component({
  templateUrl: './module-delete-dialog.component.html'
})
export class ModuleDeleteDialogComponent {
  module?: IModule;

  constructor(protected moduleService: ModuleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.moduleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('moduleListModification');
      this.activeModal.close();
    });
  }
}
