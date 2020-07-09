import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SequortalibTestModule } from '../../../test.module';
import { HistoriqueEnseignantModuleDetailComponent } from 'app/entities/historique-enseignant-module/historique-enseignant-module-detail.component';
import { HistoriqueEnseignantModule } from 'app/shared/model/historique-enseignant-module.model';

describe('Component Tests', () => {
  describe('HistoriqueEnseignantModule Management Detail Component', () => {
    let comp: HistoriqueEnseignantModuleDetailComponent;
    let fixture: ComponentFixture<HistoriqueEnseignantModuleDetailComponent>;
    const route = ({ data: of({ historiqueEnseignantModule: new HistoriqueEnseignantModule(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [HistoriqueEnseignantModuleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HistoriqueEnseignantModuleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistoriqueEnseignantModuleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load historiqueEnseignantModule on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.historiqueEnseignantModule).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
