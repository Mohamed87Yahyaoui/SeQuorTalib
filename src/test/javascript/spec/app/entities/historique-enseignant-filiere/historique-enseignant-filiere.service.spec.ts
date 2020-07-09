import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { HistoriqueEnseignantFiliereService } from 'app/entities/historique-enseignant-filiere/historique-enseignant-filiere.service';
import { IHistoriqueEnseignantFiliere, HistoriqueEnseignantFiliere } from 'app/shared/model/historique-enseignant-filiere.model';

describe('Service Tests', () => {
  describe('HistoriqueEnseignantFiliere Service', () => {
    let injector: TestBed;
    let service: HistoriqueEnseignantFiliereService;
    let httpMock: HttpTestingController;
    let elemDefault: IHistoriqueEnseignantFiliere;
    let expectedResult: IHistoriqueEnseignantFiliere | IHistoriqueEnseignantFiliere[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(HistoriqueEnseignantFiliereService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new HistoriqueEnseignantFiliere(0, currentDate, currentDate);
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

      it('should create a HistoriqueEnseignantFiliere', () => {
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

        service.create(new HistoriqueEnseignantFiliere()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a HistoriqueEnseignantFiliere', () => {
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

      it('should return a list of HistoriqueEnseignantFiliere', () => {
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

      it('should delete a HistoriqueEnseignantFiliere', () => {
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
