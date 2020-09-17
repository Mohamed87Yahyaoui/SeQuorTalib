import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { EtudiantService } from 'app/entities/etudiant/etudiant.service';
import { IEtudiant, Etudiant } from 'app/shared/model/etudiant.model';
import { Status } from 'app/shared/model/enumerations/status.model';

describe('Service Tests', () => {
  describe('Etudiant Service', () => {
    let injector: TestBed;
    let service: EtudiantService;
    let httpMock: HttpTestingController;
    let elemDefault: IEtudiant;
    let expectedResult: IEtudiant | IEtudiant[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EtudiantService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Etudiant(0, 0, 'AAAAAAA', Status.DIPLOME, currentDate, 0, 'AAAAAAA', 0);
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

      it('should create a Etudiant', () => {
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

        service.create(new Etudiant()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Etudiant', () => {
        const returnedFromService = Object.assign(
          {
            tel: 1,
            cin: 'BBBBBB',
            etat: 'BBBBBB',
            datenaissance: currentDate.format(DATE_FORMAT),
            semsetre: 1,
            section: 'BBBBBB',
            promo: 1
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

      it('should return a list of Etudiant', () => {
        const returnedFromService = Object.assign(
          {
            tel: 1,
            cin: 'BBBBBB',
            etat: 'BBBBBB',
            datenaissance: currentDate.format(DATE_FORMAT),
            semsetre: 1,
            section: 'BBBBBB',
            promo: 1
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

      it('should delete a Etudiant', () => {
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
