import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EtablissementService } from 'app/entities/etablissement/etablissement.service';
import { IEtablissement, Etablissement } from 'app/shared/model/etablissement.model';
import { Typecycle } from 'app/shared/model/enumerations/typecycle.model';

describe('Service Tests', () => {
  describe('Etablissement Service', () => {
    let injector: TestBed;
    let service: EtablissementService;
    let httpMock: HttpTestingController;
    let elemDefault: IEtablissement;
    let expectedResult: IEtablissement | IEtablissement[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EtablissementService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Etablissement(0, 'AAAAAAA', 'AAAAAAA', Typecycle.MASTER);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Etablissement', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Etablissement()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Etablissement', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            filiere: 'BBBBBB',
            cycle: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Etablissement', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            filiere: 'BBBBBB',
            cycle: 'BBBBBB'
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

      it('should delete a Etablissement', () => {
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
