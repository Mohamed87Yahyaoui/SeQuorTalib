import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IModule, Module } from 'app/shared/model/module.model';
import { ModuleService } from './module.service';
import { IFiliere } from 'app/shared/model/filiere.model';
import { FiliereService } from 'app/entities/filiere/filiere.service';
import { IEnseignant } from 'app/shared/model/enseignant.model';
import { EnseignantService } from 'app/entities/enseignant/enseignant.service';

type SelectableEntity = IFiliere | IEnseignant;

@Component({
  selector: 'jhi-module-update',
  templateUrl: './module-update.component.html'
})
export class ModuleUpdateComponent implements OnInit {
  isSaving = false;
  filieres: IFiliere[] = [];
  enseignants: IEnseignant[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    semester: [],
    filiere: [],
    enseignants: []
  });

  constructor(
    protected moduleService: ModuleService,
    protected filiereService: FiliereService,
    protected enseignantService: EnseignantService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ module }) => {
      this.updateForm(module);

      this.filiereService.query().subscribe((res: HttpResponse<IFiliere[]>) => (this.filieres = res.body || []));

      this.enseignantService.query().subscribe((res: HttpResponse<IEnseignant[]>) => (this.enseignants = res.body || []));
    });
  }

  updateForm(module: IModule): void {
    this.editForm.patchValue({
      id: module.id,
      nom: module.nom,
      semester: module.semester,
      filiere: module.filiere,
      enseignants: module.enseignants
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const module = this.createFromForm();
    if (module.id !== undefined) {
      this.subscribeToSaveResponse(this.moduleService.update(module));
    } else {
      this.subscribeToSaveResponse(this.moduleService.create(module));
    }
  }

  private createFromForm(): IModule {
    return {
      ...new Module(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      semester: this.editForm.get(['semester'])!.value,
      filiere: this.editForm.get(['filiere'])!.value,
      enseignants: this.editForm.get(['enseignants'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModule>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IEnseignant[], option: IEnseignant): IEnseignant {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
