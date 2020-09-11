import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HistoriqueEtudiantModuleService } from 'app/entities/historique-etudiant-module/historique-etudiant-module.service';
import { IHistoriqueEtudiantModule, HistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';
import { Valider } from 'app/shared/model/enumerations/valider.model';
import { Typevalidation } from 'app/shared/model/enumerations/typevalidation.model';

describe('Service Tests', () => {
  describe('HistoriqueEtudiantModule Service', () => {
    let injector: TestBed;
    let service: HistoriqueEtudiantModuleService;
    let httpMock: HttpTestingController;
    let elemDefault: IHistoriqueEtudiantModule;
    let expectedResult: IHistoriqueEtudiantModule | IHistoriqueEtudiantModule[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(HistoriqueEtudiantModuleService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new HistoriqueEtudiantModule(0, 0, Valider.V, Typevalidation.VCS);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a HistoriqueEtudiantModule', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new HistoriqueEtudiantModule()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a HistoriqueEtudiantModule', () => {
        const returnedFromService = Object.assign(
          {
            note: 1,
            validation: 'BBBBBB',
            etat: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of HistoriqueEtudiantModule', () => {
        const returnedFromService = Object.assign(
          {
            note: 1,
            validation: 'BBBBBB',
            etat: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a HistoriqueEtudiantModule', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
