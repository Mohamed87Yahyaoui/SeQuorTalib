import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IHistoriqueEtudiantFiliere, HistoriqueEtudiantFiliere } from 'app/shared/model/historique-etudiant-filiere.model';
import { HistoriqueEtudiantFiliereService } from './historique-etudiant-filiere.service';

@Component({
  selector: 'jhi-historique-etudiant-filiere-update',
  templateUrl: './historique-etudiant-filiere-update.component.html'
})
export class HistoriqueEtudiantFiliereUpdateComponent implements OnInit {
  isSaving = false;
  datedebutDp: any;
  datefinDp: any;

  editForm = this.fb.group({
    id: [],
    datedebut: [null, [Validators.required]],
    datefin: []
  });

  constructor(
    protected historiqueEtudiantFiliereService: HistoriqueEtudiantFiliereService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historiqueEtudiantFiliere }) => {
      this.updateForm(historiqueEtudiantFiliere);
    });
  }

  updateForm(historiqueEtudiantFiliere: IHistoriqueEtudiantFiliere): void {
    this.editForm.patchValue({
      id: historiqueEtudiantFiliere.id,
      datedebut: historiqueEtudiantFiliere.datedebut,
      datefin: historiqueEtudiantFiliere.datefin
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const historiqueEtudiantFiliere = this.createFromForm();
    if (historiqueEtudiantFiliere.id !== undefined) {
      this.subscribeToSaveResponse(this.historiqueEtudiantFiliereService.update(historiqueEtudiantFiliere));
    } else {
      this.subscribeToSaveResponse(this.historiqueEtudiantFiliereService.create(historiqueEtudiantFiliere));
    }
  }

  private createFromForm(): IHistoriqueEtudiantFiliere {
    return {
      ...new HistoriqueEtudiantFiliere(),
      id: this.editForm.get(['id'])!.value,
      datedebut: this.editForm.get(['datedebut'])!.value,
      datefin: this.editForm.get(['datefin'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistoriqueEtudiantFiliere>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
