import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEnseignant } from 'app/shared/model/enseignant.model';

type EntityResponseType = HttpResponse<IEnseignant>;
type EntityArrayResponseType = HttpResponse<IEnseignant[]>;

@Injectable({ providedIn: 'root' })
export class EnseignantService {
  public resourceUrl = SERVER_API_URL + 'api/enseignants';

  constructor(protected http: HttpClient) {}

  create(enseignant: IEnseignant): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(enseignant);
    return this.http
      .post<IEnseignant>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(enseignant: IEnseignant): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(enseignant);
    return this.http
      .put<IEnseignant>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEnseignant>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEnseignant[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(enseignant: IEnseignant): IEnseignant {
    const copy: IEnseignant = Object.assign({}, enseignant, {
      datenaissance:
        enseignant.datenaissance && enseignant.datenaissance.isValid() ? enseignant.datenaissance.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datenaissance = res.body.datenaissance ? moment(res.body.datenaissance) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((enseignant: IEnseignant) => {
        enseignant.datenaissance = enseignant.datenaissance ? moment(enseignant.datenaissance) : undefined;
      });
    }
    return res;
  }
}
