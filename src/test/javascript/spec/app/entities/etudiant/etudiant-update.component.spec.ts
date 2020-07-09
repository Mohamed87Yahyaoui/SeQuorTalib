import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { EtudiantUpdateComponent } from 'app/entities/etudiant/etudiant-update.component';
import { EtudiantService } from 'app/entities/etudiant/etudiant.service';
import { Etudiant } from 'app/shared/model/etudiant.model';

describe('Component Tests', () => {
  describe('Etudiant Management Update Component', () => {
    let comp: EtudiantUpdateComponent;
    let fixture: ComponentFixture<EtudiantUpdateComponent>;
    let service: EtudiantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [EtudiantUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EtudiantUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EtudiantUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EtudiantService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Etudiant(123);
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
        const entity = new Etudiant();
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
