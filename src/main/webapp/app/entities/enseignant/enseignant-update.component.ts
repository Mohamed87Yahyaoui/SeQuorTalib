import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEnseignant, Enseignant } from 'app/shared/model/enseignant.model';
import { EnseignantService } from './enseignant.service';
import { IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from 'app/entities/departement/departement.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from 'app/entities/module/module.service';

type SelectableEntity = IDepartement | IUser | IModule;

@Component({
  selector: 'jhi-enseignant-update',
  templateUrl: './enseignant-update.component.html'
})
export class EnseignantUpdateComponent implements OnInit {
  isSaving = false;
  departements: IDepartement[] = [];
  users: IUser[] = [];
  modules: IModule[] = [];
  datenaissanceDp: any;

  editForm = this.fb.group({
    id: [],
    tel: [],
    datenaissance: [],
    cin: [null, [Validators.required]],
    grade: [],
    departement: [],
    user: [],
    modules: []
  });

  constructor(
    protected enseignantService: EnseignantService,
    protected departementService: DepartementService,
    protected userService: UserService,
    protected moduleService: ModuleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ enseignant }) => {
      this.updateForm(enseignant);

      this.departementService.query().subscribe((res: HttpResponse<IDepartement[]>) => (this.departements = res.body || []));

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.moduleService.query().subscribe((res: HttpResponse<IModule[]>) => (this.modules = res.body || []));
    });
  }

  updateForm(enseignant: IEnseignant): void {
    this.editForm.patchValue({
      id: enseignant.id,
      tel: enseignant.tel,
      datenaissance: enseignant.datenaissance,
      cin: enseignant.cin,
      grade: enseignant.grade,
      departement: enseignant.departement,
      user: enseignant.user,
      modules: enseignant.modules
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
      departement: this.editForm.get(['departement'])!.value,
      user: this.editForm.get(['user'])!.value,
      modules: this.editForm.get(['modules'])!.value
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
