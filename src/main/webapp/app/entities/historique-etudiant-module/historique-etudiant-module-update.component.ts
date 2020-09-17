import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IHistoriqueEtudiantModule, HistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';
import { HistoriqueEtudiantModuleService } from './historique-etudiant-module.service';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/etudiant.service';
import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from 'app/entities/module/module.service';

type SelectableEntity = IEtudiant | IModule;

@Component({
  selector: 'jhi-historique-etudiant-module-update',
  templateUrl: './historique-etudiant-module-update.component.html'
})
export class HistoriqueEtudiantModuleUpdateComponent implements OnInit {
  isSaving = false;
  etudiants: IEtudiant[] = [];
  modules: IModule[] = [];

  editForm = this.fb.group({
    id: [],
    note: [],
    validation: [],
    etat: [],
    etudiant: [],
    module: []
  });

  constructor(
    protected historiqueEtudiantModuleService: HistoriqueEtudiantModuleService,
    protected etudiantService: EtudiantService,
    protected moduleService: ModuleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historiqueEtudiantModule }) => {
      this.updateForm(historiqueEtudiantModule);

      this.etudiantService.query().subscribe((res: HttpResponse<IEtudiant[]>) => (this.etudiants = res.body || []));

      this.moduleService.query().subscribe((res: HttpResponse<IModule[]>) => (this.modules = res.body || []));
    });
  }

  updateForm(historiqueEtudiantModule: IHistoriqueEtudiantModule): void {
    this.editForm.patchValue({
      id: historiqueEtudiantModule.id,
      note: historiqueEtudiantModule.note,
      validation: historiqueEtudiantModule.validation,
      etat: historiqueEtudiantModule.etat,
      etudiant: historiqueEtudiantModule.etudiant,
      module: historiqueEtudiantModule.module
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
      note: this.editForm.get(['note'])!.value,
      validation: this.editForm.get(['validation'])!.value,
      etat: this.editForm.get(['etat'])!.value,
      etudiant: this.editForm.get(['etudiant'])!.value,
      module: this.editForm.get(['module'])!.value
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
