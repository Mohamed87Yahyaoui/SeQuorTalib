import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFiliere } from 'app/shared/model/filiere.model';

type EntityResponseType = HttpResponse<IFiliere>;
type EntityArrayResponseType = HttpResponse<IFiliere[]>;

@Injectable({ providedIn: 'root' })
export class FiliereService {
  public resourceUrl = SERVER_API_URL + 'api/filieres';

  constructor(protected http: HttpClient) {}

  create(filiere: IFiliere): Observable<EntityResponseType> {
    return this.http.post<IFiliere>(this.resourceUrl, filiere, { observe: 'response' });
  }

  update(filiere: IFiliere): Observable<EntityResponseType> {
    return this.http.put<IFiliere>(this.resourceUrl, filiere, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFiliere>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFiliere[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
