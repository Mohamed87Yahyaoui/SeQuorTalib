import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistoriqueEnseignantFiliere } from 'app/shared/model/historique-enseignant-filiere.model';

@Component({
  selector: 'jhi-historique-enseignant-filiere-detail',
  templateUrl: './historique-enseignant-filiere-detail.component.html'
})
export class HistoriqueEnseignantFiliereDetailComponent implements OnInit {
  historiqueEnseignantFiliere: IHistoriqueEnseignantFiliere | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      ({ historiqueEnseignantFiliere }) => (this.historiqueEnseignantFiliere = historiqueEnseignantFiliere)
    );
  }

  previousState(): void {
    window.history.back();
  }
}
