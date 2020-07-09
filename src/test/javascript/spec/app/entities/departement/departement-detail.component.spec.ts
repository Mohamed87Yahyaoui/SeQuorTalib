import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { DepartementDetailComponent } from 'app/entities/departement/departement-detail.component';
import { Departement } from 'app/shared/model/departement.model';

describe('Component Tests', () => {
  describe('Departement Management Detail Component', () => {
    let comp: DepartementDetailComponent;
    let fixture: ComponentFixture<DepartementDetailComponent>;
    const route = ({ data: of({ departement: new Departement(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [DepartementDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DepartementDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepartementDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load departement on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.departement).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
