import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { HistoriqueEnseignantFiliereUpdateComponent } from 'app/entities/historique-enseignant-filiere/historique-enseignant-filiere-update.component';
import { HistoriqueEnseignantFiliereService } from 'app/entities/historique-enseignant-filiere/historique-enseignant-filiere.service';
import { HistoriqueEnseignantFiliere } from 'app/shared/model/historique-enseignant-filiere.model';

describe('Component Tests', () => {
  describe('HistoriqueEnseignantFiliere Management Update Component', () => {
    let comp: HistoriqueEnseignantFiliereUpdateComponent;
    let fixture: ComponentFixture<HistoriqueEnseignantFiliereUpdateComponent>;
    let service: HistoriqueEnseignantFiliereService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [HistoriqueEnseignantFiliereUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HistoriqueEnseignantFiliereUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistoriqueEnseignantFiliereUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistoriqueEnseignantFiliereService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HistoriqueEnseignantFiliere(123);
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
        const entity = new HistoriqueEnseignantFiliere();
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
