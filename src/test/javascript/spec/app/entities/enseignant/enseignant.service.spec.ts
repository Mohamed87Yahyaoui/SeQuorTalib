import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { EnseignantService } from 'app/entities/enseignant/enseignant.service';
import { IEnseignant, Enseignant } from 'app/shared/model/enseignant.model';

describe('Service Tests', () => {
  describe('Enseignant Service', () => {
    let injector: TestBed;
    let service: EnseignantService;
    let httpMock: HttpTestingController;
    let elemDefault: IEnseignant;
    let expectedResult: IEnseignant | IEnseignant[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EnseignantService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Enseignant(0, 0, currentDate, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            datenaissance: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Enseignant', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            datenaissance: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datenaissance: currentDate
          },
          returnedFromService
        );

        service.create(new Enseignant()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Enseignant', () => {
        const returnedFromService = Object.assign(
          {
            tel: 1,
            datenaissance: currentDate.format(DATE_FORMAT),
            cin: 'BBBBBB',
            grade: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datenaissance: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Enseignant', () => {
        const returnedFromService = Object.assign(
          {
            tel: 1,
            datenaissance: currentDate.format(DATE_FORMAT),
            cin: 'BBBBBB',
            grade: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datenaissance: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Enseignant', () => {
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
