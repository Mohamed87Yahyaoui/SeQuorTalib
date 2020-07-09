import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistoriqueEnseignantModule } from 'app/shared/model/historique-enseignant-module.model';

@Component({
  selector: 'jhi-historique-enseignant-module-detail',
  templateUrl: './historique-enseignant-module-detail.component.html'
})
export class HistoriqueEnseignantModuleDetailComponent implements OnInit {
  historiqueEnseignantModule: IHistoriqueEnseignantModule | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historiqueEnseignantModule }) => (this.historiqueEnseignantModule = historiqueEnseignantModule));
  }

  previousState(): void {
    window.history.back();
  }
}
