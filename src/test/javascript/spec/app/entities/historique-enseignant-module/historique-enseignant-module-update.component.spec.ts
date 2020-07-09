import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { HistoriqueEnseignantModuleUpdateComponent } from 'app/entities/historique-enseignant-module/historique-enseignant-module-update.component';
import { HistoriqueEnseignantModuleService } from 'app/entities/historique-enseignant-module/historique-enseignant-module.service';
import { HistoriqueEnseignantModule } from 'app/shared/model/historique-enseignant-module.model';

describe('Component Tests', () => {
  describe('HistoriqueEnseignantModule Management Update Component', () => {
    let comp: HistoriqueEnseignantModuleUpdateComponent;
    let fixture: ComponentFixture<HistoriqueEnseignantModuleUpdateComponent>;
    let service: HistoriqueEnseignantModuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [HistoriqueEnseignantModuleUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HistoriqueEnseignantModuleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistoriqueEnseignantModuleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistoriqueEnseignantModuleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HistoriqueEnseignantModule(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new HistoriqueEnseignantModule();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
