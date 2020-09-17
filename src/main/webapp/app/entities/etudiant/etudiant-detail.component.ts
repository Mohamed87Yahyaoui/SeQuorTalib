import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEtudiant } from 'app/shared/model/etudiant.model';

@Component({
  selector: 'jhi-etudiant-detail',
  templateUrl: './etudiant-detail.component.html'
})
export class EtudiantDetailComponent implements OnInit {
  etudiant: IEtudiant | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etudiant }) => (this.etudiant = etudiant));
  }

  previousState(): void {
    window.history.back();
  }
}
