import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { EtablissementUpdateComponent } from 'app/entities/etablissement/etablissement-update.component';
import { EtablissementService } from 'app/entities/etablissement/etablissement.service';
import { Etablissement } from 'app/shared/model/etablissement.model';

describe('Component Tests', () => {
  describe('Etablissement Management Update Component', () => {
    let comp: EtablissementUpdateComponent;
    let fixture: ComponentFixture<EtablissementUpdateComponent>;
    let service: EtablissementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [EtablissementUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EtablissementUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EtablissementUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EtablissementService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Etablissement(123);
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
        const entity = new Etablissement();
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
