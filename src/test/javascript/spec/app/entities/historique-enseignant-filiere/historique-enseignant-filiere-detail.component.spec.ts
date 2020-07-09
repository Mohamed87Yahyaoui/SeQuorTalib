import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { HistoriqueEnseignantFiliereDetailComponent } from 'app/entities/historique-enseignant-filiere/historique-enseignant-filiere-detail.component';
import { HistoriqueEnseignantFiliere } from 'app/shared/model/historique-enseignant-filiere.model';

describe('Component Tests', () => {
  describe('HistoriqueEnseignantFiliere Management Detail Component', () => {
    let comp: HistoriqueEnseignantFiliereDetailComponent;
    let fixture: ComponentFixture<HistoriqueEnseignantFiliereDetailComponent>;
    const route = ({ data: of({ historiqueEnseignantFiliere: new HistoriqueEnseignantFiliere(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [HistoriqueEnseignantFiliereDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HistoriqueEnseignantFiliereDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistoriqueEnseignantFiliereDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load historiqueEnseignantFiliere on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.historiqueEnseignantFiliere).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
