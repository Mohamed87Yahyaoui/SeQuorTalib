import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { HistoriqueEtudiantFiliereService } from 'app/entities/historique-etudiant-filiere/historique-etudiant-filiere.service';
import { IHistoriqueEtudiantFiliere, HistoriqueEtudiantFiliere } from 'app/shared/model/historique-etudiant-filiere.model';

describe('Service Tests', () => {
  describe('HistoriqueEtudiantFiliere Service', () => {
    let injector: TestBed;
    let service: HistoriqueEtudiantFiliereService;
    let httpMock: HttpTestingController;
    let elemDefault: IHistoriqueEtudiantFiliere;
    let expectedResult: IHistoriqueEtudiantFiliere | IHistoriqueEtudiantFiliere[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(HistoriqueEtudiantFiliereService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new HistoriqueEtudiantFiliere(0, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            datedebut: currentDate.format(DATE_FORMAT),
            datefin: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a HistoriqueEtudiantFiliere', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            datedebut: currentDate.format(DATE_FORMAT),
            datefin: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datedebut: currentDate,
            datefin: currentDate
          },
          returnedFromService
        );

        service.create(new HistoriqueEtudiantFiliere()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a HistoriqueEtudiantFiliere', () => {
        const returnedFromService = Object.assign(
          {
            datedebut: currentDate.format(DATE_FORMAT),
            datefin: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datedebut: currentDate,
            datefin: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of HistoriqueEtudiantFiliere', () => {
        const returnedFromService = Object.assign(
          {
            datedebut: currentDate.format(DATE_FORMAT),
            datefin: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datedebut: currentDate,
            datefin: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a HistoriqueEtudiantFiliere', () => {
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
