import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { HistoriqueEtudiantFiliereUpdateComponent } from 'app/entities/historique-etudiant-filiere/historique-etudiant-filiere-update.component';
import { HistoriqueEtudiantFiliereService } from 'app/entities/historique-etudiant-filiere/historique-etudiant-filiere.service';
import { HistoriqueEtudiantFiliere } from 'app/shared/model/historique-etudiant-filiere.model';

describe('Component Tests', () => {
  describe('HistoriqueEtudiantFiliere Management Update Component', () => {
    let comp: HistoriqueEtudiantFiliereUpdateComponent;
    let fixture: ComponentFixture<HistoriqueEtudiantFiliereUpdateComponent>;
    let service: HistoriqueEtudiantFiliereService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [HistoriqueEtudiantFiliereUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HistoriqueEtudiantFiliereUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistoriqueEtudiantFiliereUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistoriqueEtudiantFiliereService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HistoriqueEtudiantFiliere(123);
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
        const entity = new HistoriqueEtudiantFiliere();
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
