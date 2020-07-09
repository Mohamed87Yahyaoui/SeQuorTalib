import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';

@Component({
  selector: 'jhi-historique-etudiant-module-detail',
  templateUrl: './historique-etudiant-module-detail.component.html'
})
export class HistoriqueEtudiantModuleDetailComponent implements OnInit {
  historiqueEtudiantModule: IHistoriqueEtudiantModule | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historiqueEtudiantModule }) => (this.historiqueEtudiantModule = historiqueEtudiantModule));
  }

  previousState(): void {
    window.history.back();
  }
}
