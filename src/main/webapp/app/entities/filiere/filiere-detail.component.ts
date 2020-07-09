import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFiliere } from 'app/shared/model/filiere.model';

@Component({
  selector: 'jhi-filiere-detail',
  templateUrl: './filiere-detail.component.html'
})
export class FiliereDetailComponent implements OnInit {
  filiere: IFiliere | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ filiere }) => (this.filiere = filiere));
  }

  previousState(): void {
    window.history.back();
  }
}
