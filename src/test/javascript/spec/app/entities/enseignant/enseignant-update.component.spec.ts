import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { EnseignantUpdateComponent } from 'app/entities/enseignant/enseignant-update.component';
import { EnseignantService } from 'app/entities/enseignant/enseignant.service';
import { Enseignant } from 'app/shared/model/enseignant.model';

describe('Component Tests', () => {
  describe('Enseignant Management Update Component', () => {
    let comp: EnseignantUpdateComponent;
    let fixture: ComponentFixture<EnseignantUpdateComponent>;
    let service: EnseignantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [EnseignantUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EnseignantUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EnseignantUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EnseignantService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Enseignant(123);
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
        const entity = new Enseignant();
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
