import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IHistoriqueEtudiantModule, HistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';
import { HistoriqueEtudiantModuleService } from './historique-etudiant-module.service';

@Component({
  selector: 'jhi-historique-etudiant-module-update',
  templateUrl: './historique-etudiant-module-update.component.html'
})
export class HistoriqueEtudiantModuleUpdateComponent implements OnInit {
  isSaving = false;
  datedebutDp: any;
  datefinDp: any;

  editForm = this.fb.group({
    id: [],
    datedebut: [null, [Validators.required]],
    datefin: []
  });

  constructor(
    protected historiqueEtudiantModuleService: HistoriqueEtudiantModuleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historiqueEtudiantModule }) => {
      this.updateForm(historiqueEtudiantModule);
    });
  }

  updateForm(historiqueEtudiantModule: IHistoriqueEtudiantModule): void {
    this.editForm.patchValue({
      id: historiqueEtudiantModule.id,
      datedebut: historiqueEtudiantModule.datedebut,
      datefin: historiqueEtudiantModule.datefin
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const historiqueEtudiantModule = this.createFromForm();
    if (historiqueEtudiantModule.id !== undefined) {
      this.subscribeToSaveResponse(this.historiqueEtudiantModuleService.update(historiqueEtudiantModule));
    } else {
      this.subscribeToSaveResponse(this.historiqueEtudiantModuleService.create(historiqueEtudiantModule));
    }
  }

  private createFromForm(): IHistoriqueEtudiantModule {
    return {
      ...new HistoriqueEtudiantModule(),
      id: this.editForm.get(['id'])!.value,
      datedebut: this.editForm.get(['datedebut'])!.value,
      datefin: this.editForm.get(['datefin'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistoriqueEtudiantModule>>): void {
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
