import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { HistoriqueEtudiantModuleDetailComponent } from 'app/entities/historique-etudiant-module/historique-etudiant-module-detail.component';
import { HistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';

describe('Component Tests', () => {
  describe('HistoriqueEtudiantModule Management Detail Component', () => {
    let comp: HistoriqueEtudiantModuleDetailComponent;
    let fixture: ComponentFixture<HistoriqueEtudiantModuleDetailComponent>;
    const route = ({ data: of({ historiqueEtudiantModule: new HistoriqueEtudiantModule(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [HistoriqueEtudiantModuleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HistoriqueEtudiantModuleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistoriqueEtudiantModuleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load historiqueEtudiantModule on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.historiqueEtudiantModule).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
