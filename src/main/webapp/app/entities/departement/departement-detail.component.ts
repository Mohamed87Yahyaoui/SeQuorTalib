import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepartement } from 'app/shared/model/departement.model';

@Component({
  selector: 'jhi-departement-detail',
  templateUrl: './departement-detail.component.html'
})
export class DepartementDetailComponent implements OnInit {
  departement: IDepartement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ departement }) => (this.departement = departement));
  }

  previousState(): void {
    window.history.back();
  }
}
