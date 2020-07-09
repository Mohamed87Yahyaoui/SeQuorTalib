import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEnseignant, Enseignant } from 'app/shared/model/enseignant.model';
import { EnseignantService } from './enseignant.service';
import { IHistoriqueEnseignantModule } from 'app/shared/model/historique-enseignant-module.model';
import { HistoriqueEnseignantModuleService } from 'app/entities/historique-enseignant-module/historique-enseignant-module.service';
import { IHistoriqueEnseignantFiliere } from 'app/shared/model/historique-enseignant-filiere.model';
import { HistoriqueEnseignantFiliereService } from 'app/entities/historique-enseignant-filiere/historique-enseignant-filiere.service';
import { IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from 'app/entities/departement/departement.service';

type SelectableEntity = IHistoriqueEnseignantModule | IHistoriqueEnseignantFiliere | IDepartement;

@Component({
  selector: 'jhi-enseignant-update',
  templateUrl: './enseignant-update.component.html'
})
export class EnseignantUpdateComponent implements OnInit {
  isSaving = false;
  historiqueenseignantmodules: IHistoriqueEnseignantModule[] = [];
  historiqueenseignantfilieres: IHistoriqueEnseignantFiliere[] = [];
  departements: IDepartement[] = [];
  datenaissanceDp: any;

  editForm = this.fb.group({
    id: [],
    tel: [],
    datenaissance: [],
    cin: [null, [Validators.required]],
    grade: [],
    historiqueEnseignantModule: [],
    historiqueEnseignantFiliere: [],
    departement: []
  });

  constructor(
    protected enseignantService: EnseignantService,
    protected historiqueEnseignantModuleService: HistoriqueEnseignantModuleService,
    protected historiqueEnseignantFiliereService: HistoriqueEnseignantFiliereService,
    protected departementService: DepartementService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ enseignant }) => {
      this.updateForm(enseignant);

      this.historiqueEnseignantModuleService
        .query()
        .subscribe((res: HttpResponse<IHistoriqueEnseignantModule[]>) => (this.historiqueenseignantmodules = res.body || []));

      this.historiqueEnseignantFiliereService
        .query()
        .subscribe((res: HttpResponse<IHistoriqueEnseignantFiliere[]>) => (this.historiqueenseignantfilieres = res.body || []));

      this.departementService.query().subscribe((res: HttpResponse<IDepartement[]>) => (this.departements = res.body || []));
    });
  }

  updateForm(enseignant: IEnseignant): void {
    this.editForm.patchValue({
      id: enseignant.id,
      tel: enseignant.tel,
      datenaissance: enseignant.datenaissance,
      cin: enseignant.cin,
      grade: enseignant.grade,
      historiqueEnseignantModule: enseignant.historiqueEnseignantModule,
      historiqueEnseignantFiliere: enseignant.historiqueEnseignantFiliere,
      departement: enseignant.departement
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const enseignant = this.createFromForm();
    if (enseignant.id !== undefined) {
      this.subscribeToSaveResponse(this.enseignantService.update(enseignant));
    } else {
      this.subscribeToSaveResponse(this.enseignantService.create(enseignant));
    }
  }

  private createFromForm(): IEnseignant {
    return {
      ...new Enseignant(),
      id: this.editForm.get(['id'])!.value,
      tel: this.editForm.get(['tel'])!.value,
      datenaissance: this.editForm.get(['datenaissance'])!.value,
      cin: this.editForm.get(['cin'])!.value,
      grade: this.editForm.get(['grade'])!.value,
      historiqueEnseignantModule: this.editForm.get(['historiqueEnseignantModule'])!.value,
      historiqueEnseignantFiliere: this.editForm.get(['historiqueEnseignantFiliere'])!.value,
      departement: this.editForm.get(['departement'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnseignant>>): void {
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
}
