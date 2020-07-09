import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { SequortalibTestModule } from '../../../test.module';
import { HistoriqueEtudiantFiliereComponent } from 'app/entities/historique-etudiant-filiere/historique-etudiant-filiere.component';
import { HistoriqueEtudiantFiliereService } from 'app/entities/historique-etudiant-filiere/historique-etudiant-filiere.service';
import { HistoriqueEtudiantFiliere } from 'app/shared/model/historique-etudiant-filiere.model';

describe('Component Tests', () => {
  describe('HistoriqueEtudiantFiliere Management Component', () => {
    let comp: HistoriqueEtudiantFiliereComponent;
    let fixture: ComponentFixture<HistoriqueEtudiantFiliereComponent>;
    let service: HistoriqueEtudiantFiliereService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SequortalibTestModule],
        declarations: [HistoriqueEtudiantFiliereComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(HistoriqueEtudiantFiliereComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistoriqueEtudiantFiliereComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistoriqueEtudiantFiliereService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new HistoriqueEtudiantFiliere(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.historiqueEtudiantFilieres && comp.historiqueEtudiantFilieres[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new HistoriqueEtudiantFiliere(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.historiqueEtudiantFilieres && comp.historiqueEtudiantFilieres[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should re-initialize the page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new HistoriqueEtudiantFiliere(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);
      comp.reset();

      // THEN
      expect(comp.page).toEqual(0);
      expect(service.query).toHaveBeenCalledTimes(2);
      expect(comp.historiqueEtudiantFilieres && comp.historiqueEtudiantFilieres[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,asc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,asc', 'id']);
    });
  });
});
