import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEtablissement } from 'app/shared/model/etablissement.model';

@Component({
  selector: 'jhi-etablissement-detail',
  templateUrl: './etablissement-detail.component.html'
})
export class EtablissementDetailComponent implements OnInit {
  etablissement: IEtablissement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etablissement }) => (this.etablissement = etablissement));
  }

  previousState(): void {
    window.history.back();
  }
}
