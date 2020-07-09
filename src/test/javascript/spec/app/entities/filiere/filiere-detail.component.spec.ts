import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { FiliereDetailComponent } from 'app/entities/filiere/filiere-detail.component';
import { Filiere } from 'app/shared/model/filiere.model';

describe('Component Tests', () => {
  describe('Filiere Management Detail Component', () => {
    let comp: FiliereDetailComponent;
    let fixture: ComponentFixture<FiliereDetailComponent>;
    const route = ({ data: of({ filiere: new Filiere(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [FiliereDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FiliereDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FiliereDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load filiere on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.filiere).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
