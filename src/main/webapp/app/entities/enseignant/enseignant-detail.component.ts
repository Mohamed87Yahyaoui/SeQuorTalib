import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEnseignant } from 'app/shared/model/enseignant.model';

@Component({
  selector: 'jhi-enseignant-detail',
  templateUrl: './enseignant-detail.component.html'
})
export class EnseignantDetailComponent implements OnInit {
  enseignant: IEnseignant | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ enseignant }) => (this.enseignant = enseignant));
  }

  previousState(): void {
    window.history.back();
  }
}
