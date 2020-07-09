import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHistoriqueEtudiantFiliere } from 'app/shared/model/historique-etudiant-filiere.model';

type EntityResponseType = HttpResponse<IHistoriqueEtudiantFiliere>;
type EntityArrayResponseType = HttpResponse<IHistoriqueEtudiantFiliere[]>;

@Injectable({ providedIn: 'root' })
export class HistoriqueEtudiantFiliereService {
  public resourceUrl = SERVER_API_URL + 'api/historique-etudiant-filieres';

  constructor(protected http: HttpClient) {}

  create(historiqueEtudiantFiliere: IHistoriqueEtudiantFiliere): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historiqueEtudiantFiliere);
    return this.http
      .post<IHistoriqueEtudiantFiliere>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(historiqueEtudiantFiliere: IHistoriqueEtudiantFiliere): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historiqueEtudiantFiliere);
    return this.http
      .put<IHistoriqueEtudiantFiliere>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHistoriqueEtudiantFiliere>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHistoriqueEtudiantFiliere[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(historiqueEtudiantFiliere: IHistoriqueEtudiantFiliere): IHistoriqueEtudiantFiliere {
    const copy: IHistoriqueEtudiantFiliere = Object.assign({}, historiqueEtudiantFiliere, {
      datedebut:
        historiqueEtudiantFiliere.datedebut && historiqueEtudiantFiliere.datedebut.isValid()
          ? historiqueEtudiantFiliere.datedebut.format(DATE_FORMAT)
          : undefined,
      datefin:
        historiqueEtudiantFiliere.datefin && historiqueEtudiantFiliere.datefin.isValid()
          ? historiqueEtudiantFiliere.datefin.format(DATE_FORMAT)
          : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datedebut = res.body.datedebut ? moment(res.body.datedebut) : undefined;
      res.body.datefin = res.body.datefin ? moment(res.body.datefin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((historiqueEtudiantFiliere: IHistoriqueEtudiantFiliere) => {
        historiqueEtudiantFiliere.datedebut = historiqueEtudiantFiliere.datedebut ? moment(historiqueEtudiantFiliere.datedebut) : undefined;
        historiqueEtudiantFiliere.datefin = historiqueEtudiantFiliere.datefin ? moment(historiqueEtudiantFiliere.datefin) : undefined;
      });
    }
    return res;
  }
}
