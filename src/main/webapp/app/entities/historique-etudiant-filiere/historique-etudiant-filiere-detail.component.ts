import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistoriqueEtudiantFiliere } from 'app/shared/model/historique-etudiant-filiere.model';

@Component({
  selector: 'jhi-historique-etudiant-filiere-detail',
  templateUrl: './historique-etudiant-filiere-detail.component.html'
})
export class HistoriqueEtudiantFiliereDetailComponent implements OnInit {
  historiqueEtudiantFiliere: IHistoriqueEtudiantFiliere | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historiqueEtudiantFiliere }) => (this.historiqueEtudiantFiliere = historiqueEtudiantFiliere));
  }

  previousState(): void {
    window.history.back();
  }
}
