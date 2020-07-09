import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFiliere, Filiere } from 'app/shared/model/filiere.model';
import { FiliereService } from './filiere.service';
import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from 'app/entities/module/module.service';
import { IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from 'app/entities/departement/departement.service';
import { IHistoriqueEnseignantFiliere } from 'app/shared/model/historique-enseignant-filiere.model';
import { HistoriqueEnseignantFiliereService } from 'app/entities/historique-enseignant-filiere/historique-enseignant-filiere.service';
import { IHistoriqueEtudiantFiliere } from 'app/shared/model/historique-etudiant-filiere.model';
import { HistoriqueEtudiantFiliereService } from 'app/entities/historique-etudiant-filiere/historique-etudiant-filiere.service';

type SelectableEntity = IModule | IDepartement | IHistoriqueEnseignantFiliere | IHistoriqueEtudiantFiliere;

@Component({
  selector: 'jhi-filiere-update',
  templateUrl: './filiere-update.component.html'
})
export class FiliereUpdateComponent implements OnInit {
  isSaving = false;
  modules: IModule[] = [];
  departements: IDepartement[] = [];
  historiqueenseignantfilieres: IHistoriqueEnseignantFiliere[] = [];
  historiqueetudiantfilieres: IHistoriqueEtudiantFiliere[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    modules: [],
    departement: [],
    historiqueEnseignantFiliere: [],
    historiqueEtudiantFiliere: []
  });

  constructor(
    protected filiereService: FiliereService,
    protected moduleService: ModuleService,
    protected departementService: DepartementService,
    protected historiqueEnseignantFiliereService: HistoriqueEnseignantFiliereService,
    protected historiqueEtudiantFiliereService: HistoriqueEtudiantFiliereService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ filiere }) => {
      this.updateForm(filiere);

      this.moduleService.query().subscribe((res: HttpResponse<IModule[]>) => (this.modules = res.body || []));

      this.departementService.query().subscribe((res: HttpResponse<IDepartement[]>) => (this.departements = res.body || []));

      this.historiqueEnseignantFiliereService
        .query()
        .subscribe((res: HttpResponse<IHistoriqueEnseignantFiliere[]>) => (this.historiqueenseignantfilieres = res.body || []));

      this.historiqueEtudiantFiliereService
        .query()
        .subscribe((res: HttpResponse<IHistoriqueEtudiantFiliere[]>) => (this.historiqueetudiantfilieres = res.body || []));
    });
  }

  updateForm(filiere: IFiliere): void {
    this.editForm.patchValue({
      id: filiere.id,
      nom: filiere.nom,
      modules: filiere.modules,
      departement: filiere.departement,
      historiqueEnseignantFiliere: filiere.historiqueEnseignantFiliere,
      historiqueEtudiantFiliere: filiere.historiqueEtudiantFiliere
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
      modules: this.editForm.get(['modules'])!.value,
      departement: this.editForm.get(['departement'])!.value,
      historiqueEnseignantFiliere: this.editForm.get(['historiqueEnseignantFiliere'])!.value,
      historiqueEtudiantFiliere: this.editForm.get(['historiqueEtudiantFiliere'])!.value
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

  getSelected(selectedVals: IModule[], option: IModule): IModule {
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
