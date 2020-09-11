import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<IHistoriqueEtudiantModule>(this.resourceUrl, historiqueEtudiantModule, { observe: 'response' });
  }

  update(historiqueEtudiantModule: IHistoriqueEtudiantModule): Observable<EntityResponseType> {
    return this.http.put<IHistoriqueEtudiantModule>(this.resourceUrl, historiqueEtudiantModule, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHistoriqueEtudiantModule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHistoriqueEtudiantModule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
