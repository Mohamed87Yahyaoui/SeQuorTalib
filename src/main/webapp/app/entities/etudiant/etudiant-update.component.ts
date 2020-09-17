import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEtudiant, Etudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from './etudiant.service';
import { IEtablissement } from 'app/shared/model/etablissement.model';
import { EtablissementService } from 'app/entities/etablissement/etablissement.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IFiliere } from 'app/shared/model/filiere.model';
import { FiliereService } from 'app/entities/filiere/filiere.service';
import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from 'app/entities/module/module.service';

type SelectableEntity = IEtablissement | IUser | IFiliere | IModule;

@Component({
  selector: 'jhi-etudiant-update',
  templateUrl: './etudiant-update.component.html'
})
export class EtudiantUpdateComponent implements OnInit {
  isSaving = false;
  etablissements: IEtablissement[] = [];
  users: IUser[] = [];
  filieres: IFiliere[] = [];
  modules: IModule[] = [];
  datenaissanceDp: any;

  editForm = this.fb.group({
    id: [],
    tel: [],
    cin: [null, [Validators.required]],
    etat: [null, [Validators.required]],
    datenaissance: [],
    semsetre: [],
    section: [],
    promo: [],
    etablissement: [],
    user: [],
    filiere: [],
    modules: []
  });

  constructor(
    protected etudiantService: EtudiantService,
    protected etablissementService: EtablissementService,
    protected userService: UserService,
    protected filiereService: FiliereService,
    protected moduleService: ModuleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etudiant }) => {
      this.updateForm(etudiant);

      this.etablissementService.query().subscribe((res: HttpResponse<IEtablissement[]>) => (this.etablissements = res.body || []));

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.filiereService.query().subscribe((res: HttpResponse<IFiliere[]>) => (this.filieres = res.body || []));

      this.moduleService.query().subscribe((res: HttpResponse<IModule[]>) => (this.modules = res.body || []));
    });
  }

  updateForm(etudiant: IEtudiant): void {
    this.editForm.patchValue({
      id: etudiant.id,
      tel: etudiant.tel,
      cin: etudiant.cin,
      etat: etudiant.etat,
      datenaissance: etudiant.datenaissance,
      semsetre: etudiant.semsetre,
      section: etudiant.section,
      promo: etudiant.promo,
      etablissement: etudiant.etablissement,
      user: etudiant.user,
      filiere: etudiant.filiere,
      modules: etudiant.modules
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const etudiant = this.createFromForm();
    if (etudiant.id !== undefined) {
      this.subscribeToSaveResponse(this.etudiantService.update(etudiant));
    } else {
      this.subscribeToSaveResponse(this.etudiantService.create(etudiant));
    }
  }

  private createFromForm(): IEtudiant {
    return {
      ...new Etudiant(),
      id: this.editForm.get(['id'])!.value,
      tel: this.editForm.get(['tel'])!.value,
      cin: this.editForm.get(['cin'])!.value,
      etat: this.editForm.get(['etat'])!.value,
      datenaissance: this.editForm.get(['datenaissance'])!.value,
      semsetre: this.editForm.get(['semsetre'])!.value,
      section: this.editForm.get(['section'])!.value,
      promo: this.editForm.get(['promo'])!.value,
      etablissement: this.editForm.get(['etablissement'])!.value,
      user: this.editForm.get(['user'])!.value,
      filiere: this.editForm.get(['filiere'])!.value,
      modules: this.editForm.get(['modules'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtudiant>>): void {
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
