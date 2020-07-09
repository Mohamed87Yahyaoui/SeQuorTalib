import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { HistoriqueEtudiantModuleUpdateComponent } from 'app/entities/historique-etudiant-module/historique-etudiant-module-update.component';
import { HistoriqueEtudiantModuleService } from 'app/entities/historique-etudiant-module/historique-etudiant-module.service';
import { HistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';

describe('Component Tests', () => {
  describe('HistoriqueEtudiantModule Management Update Component', () => {
    let comp: HistoriqueEtudiantModuleUpdateComponent;
    let fixture: ComponentFixture<HistoriqueEtudiantModuleUpdateComponent>;
    let service: HistoriqueEtudiantModuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [HistoriqueEtudiantModuleUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HistoriqueEtudiantModuleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistoriqueEtudiantModuleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistoriqueEtudiantModuleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HistoriqueEtudiantModule(123);
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
        const entity = new HistoriqueEtudiantModule();
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
