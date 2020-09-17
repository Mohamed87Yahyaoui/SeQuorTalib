import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFiliere, Filiere } from 'app/shared/model/filiere.model';
import { FiliereService } from './filiere.service';
import { IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from 'app/entities/departement/departement.service';
import { IEnseignant } from 'app/shared/model/enseignant.model';
import { EnseignantService } from 'app/entities/enseignant/enseignant.service';

type SelectableEntity = IDepartement | IEnseignant;

@Component({
  selector: 'jhi-filiere-update',
  templateUrl: './filiere-update.component.html'
})
export class FiliereUpdateComponent implements OnInit {
  isSaving = false;
  departements: IDepartement[] = [];
  enseignants: IEnseignant[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    departement: [],
    enseignants: []
  });

  constructor(
    protected filiereService: FiliereService,
    protected departementService: DepartementService,
    protected enseignantService: EnseignantService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ filiere }) => {
      this.updateForm(filiere);

      this.departementService.query().subscribe((res: HttpResponse<IDepartement[]>) => (this.departements = res.body || []));

      this.enseignantService.query().subscribe((res: HttpResponse<IEnseignant[]>) => (this.enseignants = res.body || []));
    });
  }

  updateForm(filiere: IFiliere): void {
    this.editForm.patchValue({
      id: filiere.id,
      nom: filiere.nom,
      departement: filiere.departement,
      enseignants: filiere.enseignants
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const filiere = this.createFromForm();
    if (filiere.id !== undefined) {
      this.subscribeToSaveResponse(this.filiereService.update(filiere));
    } else {
      this.subscribeToSaveResponse(this.filiereService.create(filiere));
    }
  }

  private createFromForm(): IFiliere {
    return {
      ...new Filiere(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      departement: this.editForm.get(['departement'])!.value,
      enseignants: this.editForm.get(['enseignants'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFiliere>>): void {
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
