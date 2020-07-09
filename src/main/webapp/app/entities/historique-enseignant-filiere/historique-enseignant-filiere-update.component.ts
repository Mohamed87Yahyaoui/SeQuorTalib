import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IHistoriqueEnseignantFiliere, HistoriqueEnseignantFiliere } from 'app/shared/model/historique-enseignant-filiere.model';
import { HistoriqueEnseignantFiliereService } from './historique-enseignant-filiere.service';

@Component({
  selector: 'jhi-historique-enseignant-filiere-update',
  templateUrl: './historique-enseignant-filiere-update.component.html'
})
export class HistoriqueEnseignantFiliereUpdateComponent implements OnInit {
  isSaving = false;
  datedebutDp: any;
  datefinDp: any;

  editForm = this.fb.group({
    id: [],
    datedebut: [null, [Validators.required]],
    datefin: []
  });

  constructor(
    protected historiqueEnseignantFiliereService: HistoriqueEnseignantFiliereService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historiqueEnseignantFiliere }) => {
      this.updateForm(historiqueEnseignantFiliere);
    });
  }

  updateForm(historiqueEnseignantFiliere: IHistoriqueEnseignantFiliere): void {
    this.editForm.patchValue({
      id: historiqueEnseignantFiliere.id,
      datedebut: historiqueEnseignantFiliere.datedebut,
      datefin: historiqueEnseignantFiliere.datefin
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const historiqueEnseignantFiliere = this.createFromForm();
    if (historiqueEnseignantFiliere.id !== undefined) {
      this.subscribeToSaveResponse(this.historiqueEnseignantFiliereService.update(historiqueEnseignantFiliere));
    } else {
      this.subscribeToSaveResponse(this.historiqueEnseignantFiliereService.create(historiqueEnseignantFiliere));
    }
  }

  private createFromForm(): IHistoriqueEnseignantFiliere {
    return {
      ...new HistoriqueEnseignantFiliere(),
      id: this.editForm.get(['id'])!.value,
      datedebut: this.editForm.get(['datedebut'])!.value,
      datefin: this.editForm.get(['datefin'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistoriqueEnseignantFiliere>>): void {
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
