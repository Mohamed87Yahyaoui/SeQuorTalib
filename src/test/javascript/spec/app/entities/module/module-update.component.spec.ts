import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { ModuleUpdateComponent } from 'app/entities/module/module-update.component';
import { ModuleService } from 'app/entities/module/module.service';
import { Module } from 'app/shared/model/module.model';

describe('Component Tests', () => {
  describe('Module Management Update Component', () => {
    let comp: ModuleUpdateComponent;
    let fixture: ComponentFixture<ModuleUpdateComponent>;
    let service: ModuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [ModuleUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ModuleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ModuleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ModuleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Module(123);
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
        const entity = new Module();
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
