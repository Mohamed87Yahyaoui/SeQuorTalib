import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHistoriqueEnseignantFiliere } from 'app/shared/model/historique-enseignant-filiere.model';

type EntityResponseType = HttpResponse<IHistoriqueEnseignantFiliere>;
type EntityArrayResponseType = HttpResponse<IHistoriqueEnseignantFiliere[]>;

@Injectable({ providedIn: 'root' })
export class HistoriqueEnseignantFiliereService {
  public resourceUrl = SERVER_API_URL + 'api/historique-enseignant-filieres';

  constructor(protected http: HttpClient) {}

  create(historiqueEnseignantFiliere: IHistoriqueEnseignantFiliere): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historiqueEnseignantFiliere);
    return this.http
      .post<IHistoriqueEnseignantFiliere>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(historiqueEnseignantFiliere: IHistoriqueEnseignantFiliere): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historiqueEnseignantFiliere);
    return this.http
      .put<IHistoriqueEnseignantFiliere>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHistoriqueEnseignantFiliere>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHistoriqueEnseignantFiliere[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(historiqueEnseignantFiliere: IHistoriqueEnseignantFiliere): IHistoriqueEnseignantFiliere {
    const copy: IHistoriqueEnseignantFiliere = Object.assign({}, historiqueEnseignantFiliere, {
      datedebut:
        historiqueEnseignantFiliere.datedebut && historiqueEnseignantFiliere.datedebut.isValid()
          ? historiqueEnseignantFiliere.datedebut.format(DATE_FORMAT)
          : undefined,
      datefin:
        historiqueEnseignantFiliere.datefin && historiqueEnseignantFiliere.datefin.isValid()
          ? historiqueEnseignantFiliere.datefin.format(DATE_FORMAT)
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
      res.body.forEach((historiqueEnseignantFiliere: IHistoriqueEnseignantFiliere) => {
        historiqueEnseignantFiliere.datedebut = historiqueEnseignantFiliere.datedebut
          ? moment(historiqueEnseignantFiliere.datedebut)
          : undefined;
        historiqueEnseignantFiliere.datefin = historiqueEnseignantFiliere.datefin ? moment(historiqueEnseignantFiliere.datefin) : undefined;
      });
    }
    return res;
  }
}
