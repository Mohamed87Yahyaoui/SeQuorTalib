import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEtudiant } from 'app/shared/model/etudiant.model';
import { EtudiantDeleteDialogComponent } from 'app/entities/etudiant/etudiant-delete-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-etudiant-detail',
  templateUrl: './etudiant-detail.component.html'
})
export class EtudiantDetailComponent implements OnInit {
  etudiant: IEtudiant | null = null;

  constructor(protected activatedRoute: ActivatedRoute, protected modalService: NgbModal) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etudiant }) => (this.etudiant = etudiant));
  }

  previousState(): void {
    window.history.back();
  }

  delete(etudiant: IEtudiant): void {
    const modalRef = this.modalService.open(EtudiantDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.etudiant = etudiant;
  }
}
