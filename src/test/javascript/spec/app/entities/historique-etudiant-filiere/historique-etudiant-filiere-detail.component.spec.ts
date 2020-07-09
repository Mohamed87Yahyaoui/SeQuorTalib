import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { HistoriqueEtudiantFiliereDetailComponent } from 'app/entities/historique-etudiant-filiere/historique-etudiant-filiere-detail.component';
import { HistoriqueEtudiantFiliere } from 'app/shared/model/historique-etudiant-filiere.model';

describe('Component Tests', () => {
  describe('HistoriqueEtudiantFiliere Management Detail Component', () => {
    let comp: HistoriqueEtudiantFiliereDetailComponent;
    let fixture: ComponentFixture<HistoriqueEtudiantFiliereDetailComponent>;
    const route = ({ data: of({ historiqueEtudiantFiliere: new HistoriqueEtudiantFiliere(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [HistoriqueEtudiantFiliereDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HistoriqueEtudiantFiliereDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistoriqueEtudiantFiliereDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load historiqueEtudiantFiliere on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.historiqueEtudiantFiliere).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
