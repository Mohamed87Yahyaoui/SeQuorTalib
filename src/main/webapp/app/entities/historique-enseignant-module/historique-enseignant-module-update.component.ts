import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IHistoriqueEnseignantModule, HistoriqueEnseignantModule } from 'app/shared/model/historique-enseignant-module.model';
import { HistoriqueEnseignantModuleService } from './historique-enseignant-module.service';

@Component({
  selector: 'jhi-historique-enseignant-module-update',
  templateUrl: './historique-enseignant-module-update.component.html'
})
export class HistoriqueEnseignantModuleUpdateComponent implements OnInit {
  isSaving = false;
  datedebutDp: any;
  datefinDp: any;

  editForm = this.fb.group({
    id: [],
    datedebut: [null, [Validators.required]],
    datefin: []
  });

  constructor(
    protected historiqueEnseignantModuleService: HistoriqueEnseignantModuleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historiqueEnseignantModule }) => {
      this.updateForm(historiqueEnseignantModule);
    });
  }

  updateForm(historiqueEnseignantModule: IHistoriqueEnseignantModule): void {
    this.editForm.patchValue({
      id: historiqueEnseignantModule.id,
      datedebut: historiqueEnseignantModule.datedebut,
      datefin: historiqueEnseignantModule.datefin
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const historiqueEnseignantModule = this.createFromForm();
    if (historiqueEnseignantModule.id !== undefined) {
      this.subscribeToSaveResponse(this.historiqueEnseignantModuleService.update(historiqueEnseignantModule));
    } else {
      this.subscribeToSaveResponse(this.historiqueEnseignantModuleService.create(historiqueEnseignantModule));
    }
  }

  private createFromForm(): IHistoriqueEnseignantModule {
    return {
      ...new HistoriqueEnseignantModule(),
      id: this.editForm.get(['id'])!.value,
      datedebut: this.editForm.get(['datedebut'])!.value,
      datefin: this.editForm.get(['datefin'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistoriqueEnseignantModule>>): void {
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
