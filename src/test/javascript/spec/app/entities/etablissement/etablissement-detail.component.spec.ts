import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { EtablissementDetailComponent } from 'app/entities/etablissement/etablissement-detail.component';
import { Etablissement } from 'app/shared/model/etablissement.model';

describe('Component Tests', () => {
  describe('Etablissement Management Detail Component', () => {
    let comp: EtablissementDetailComponent;
    let fixture: ComponentFixture<EtablissementDetailComponent>;
    const route = ({ data: of({ etablissement: new Etablissement(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [EtablissementDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EtablissementDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EtablissementDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load etablissement on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.etablissement).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
