import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHistoriqueEnseignantModule } from 'app/shared/model/historique-enseignant-module.model';

type EntityResponseType = HttpResponse<IHistoriqueEnseignantModule>;
type EntityArrayResponseType = HttpResponse<IHistoriqueEnseignantModule[]>;

@Injectable({ providedIn: 'root' })
export class HistoriqueEnseignantModuleService {
  public resourceUrl = SERVER_API_URL + 'api/historique-enseignant-modules';

  constructor(protected http: HttpClient) {}

  create(historiqueEnseignantModule: IHistoriqueEnseignantModule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historiqueEnseignantModule);
    return this.http
      .post<IHistoriqueEnseignantModule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(historiqueEnseignantModule: IHistoriqueEnseignantModule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historiqueEnseignantModule);
    return this.http
      .put<IHistoriqueEnseignantModule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHistoriqueEnseignantModule>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHistoriqueEnseignantModule[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(historiqueEnseignantModule: IHistoriqueEnseignantModule): IHistoriqueEnseignantModule {
    const copy: IHistoriqueEnseignantModule = Object.assign({}, historiqueEnseignantModule, {
      datedebut:
        historiqueEnseignantModule.datedebut && historiqueEnseignantModule.datedebut.isValid()
          ? historiqueEnseignantModule.datedebut.format(DATE_FORMAT)
          : undefined,
      datefin:
        historiqueEnseignantModule.datefin && historiqueEnseignantModule.datefin.isValid()
          ? historiqueEnseignantModule.datefin.format(DATE_FORMAT)
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
      res.body.forEach((historiqueEnseignantModule: IHistoriqueEnseignantModule) => {
        historiqueEnseignantModule.datedebut = historiqueEnseignantModule.datedebut
          ? moment(historiqueEnseignantModule.datedebut)
          : undefined;
        historiqueEnseignantModule.datefin = historiqueEnseignantModule.datefin ? moment(historiqueEnseignantModule.datefin) : undefined;
      });
    }
    return res;
  }
}
