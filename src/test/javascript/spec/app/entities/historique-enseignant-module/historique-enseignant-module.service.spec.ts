import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { HistoriqueEnseignantModuleService } from 'app/entities/historique-enseignant-module/historique-enseignant-module.service';
import { IHistoriqueEnseignantModule, HistoriqueEnseignantModule } from 'app/shared/model/historique-enseignant-module.model';

describe('Service Tests', () => {
  describe('HistoriqueEnseignantModule Service', () => {
    let injector: TestBed;
    let service: HistoriqueEnseignantModuleService;
    let httpMock: HttpTestingController;
    let elemDefault: IHistoriqueEnseignantModule;
    let expectedResult: IHistoriqueEnseignantModule | IHistoriqueEnseignantModule[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(HistoriqueEnseignantModuleService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new HistoriqueEnseignantModule(0, currentDate, currentDate);
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

      it('should create a HistoriqueEnseignantModule', () => {
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

        service.create(new HistoriqueEnseignantModule()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a HistoriqueEnseignantModule', () => {
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

      it('should return a list of HistoriqueEnseignantModule', () => {
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

      it('should delete a HistoriqueEnseignantModule', () => {
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
