import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { FiliereUpdateComponent } from 'app/entities/filiere/filiere-update.component';
import { FiliereService } from 'app/entities/filiere/filiere.service';
import { Filiere } from 'app/shared/model/filiere.model';

describe('Component Tests', () => {
  describe('Filiere Management Update Component', () => {
    let comp: FiliereUpdateComponent;
    let fixture: ComponentFixture<FiliereUpdateComponent>;
    let service: FiliereService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [FiliereUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FiliereUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FiliereUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FiliereService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Filiere(123);
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
        const entity = new Filiere();
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
