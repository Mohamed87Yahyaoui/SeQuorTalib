import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { DepartementUpdateComponent } from 'app/entities/departement/departement-update.component';
import { DepartementService } from 'app/entities/departement/departement.service';
import { Departement } from 'app/shared/model/departement.model';

describe('Component Tests', () => {
  describe('Departement Management Update Component', () => {
    let comp: DepartementUpdateComponent;
    let fixture: ComponentFixture<DepartementUpdateComponent>;
    let service: DepartementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [DepartementUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DepartementUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartementUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartementService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Departement(123);
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
        const entity = new Departement();
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
