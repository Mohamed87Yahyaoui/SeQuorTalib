import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';

type EntityResponseType = HttpResponse<IHistoriqueEtudiantModule>;
type EntityArrayResponseType = HttpResponse<IHistoriqueEtudiantModule[]>;

@Injectable({ providedIn: 'root' })
export class HistoriqueEtudiantModuleService {
  public resourceUrl = SERVER_API_URL + 'api/historique-etudiant-modules';

  constructor(protected http: HttpClient) {}

  create(historiqueEtudiantModule: IHistoriqueEtudiantModule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historiqueEtudiantModule);
    return this.http
      .post<IHistoriqueEtudiantModule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(historiqueEtudiantModule: IHistoriqueEtudiantModule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historiqueEtudiantModule);
    return this.http
      .put<IHistoriqueEtudiantModule>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHistoriqueEtudiantModule>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHistoriqueEtudiantModule[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(historiqueEtudiantModule: IHistoriqueEtudiantModule): IHistoriqueEtudiantModule {
    const copy: IHistoriqueEtudiantModule = Object.assign({}, historiqueEtudiantModule, {
      datedebut:
        historiqueEtudiantModule.datedebut && historiqueEtudiantModule.datedebut.isValid()
          ? historiqueEtudiantModule.datedebut.format(DATE_FORMAT)
          : undefined,
      datefin:
        historiqueEtudiantModule.datefin && historiqueEtudiantModule.datefin.isValid()
          ? historiqueEtudiantModule.datefin.format(DATE_FORMAT)
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
      res.body.forEach((historiqueEtudiantModule: IHistoriqueEtudiantModule) => {
        historiqueEtudiantModule.datedebut = historiqueEtudiantModule.datedebut ? moment(historiqueEtudiantModule.datedebut) : undefined;
        historiqueEtudiantModule.datefin = historiqueEtudiantModule.datefin ? moment(historiqueEtudiantModule.datefin) : undefined;
      });
    }
    return res;
  }
}
