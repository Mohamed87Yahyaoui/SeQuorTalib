import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHistoriqueEnseignantFiliere, HistoriqueEnseignantFiliere } from 'app/shared/model/historique-enseignant-filiere.model';
import { HistoriqueEnseignantFiliereService } from './historique-enseignant-filiere.service';
import { HistoriqueEnseignantFiliereComponent } from './historique-enseignant-filiere.component';
import { HistoriqueEnseignantFiliereDetailComponent } from './historique-enseignant-filiere-detail.component';
import { HistoriqueEnseignantFiliereUpdateComponent } from './historique-enseignant-filiere-update.component';

@Injectable({ providedIn: 'root' })
export class HistoriqueEnseignantFiliereResolve implements Resolve<IHistoriqueEnseignantFiliere> {
  constructor(private service: HistoriqueEnseignantFiliereService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistoriqueEnseignantFiliere> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((historiqueEnseignantFiliere: HttpResponse<HistoriqueEnseignantFiliere>) => {
          if (historiqueEnseignantFiliere.body) {
            return of(historiqueEnseignantFiliere.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HistoriqueEnseignantFiliere());
  }
}

export const historiqueEnseignantFiliereRoute: Routes = [
  {
    path: '',
    component: HistoriqueEnseignantFiliereComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.ENSEIGNANT],
      pageTitle: 'sequortalibApp.historiqueEnseignantFiliere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HistoriqueEnseignantFiliereDetailComponent,
    resolve: {
      historiqueEnseignantFiliere: HistoriqueEnseignantFiliereResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.historiqueEnseignantFiliere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HistoriqueEnseignantFiliereUpdateComponent,
    resolve: {
      historiqueEnseignantFiliere: HistoriqueEnseignantFiliereResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.historiqueEnseignantFiliere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HistoriqueEnseignantFiliereUpdateComponent,
    resolve: {
      historiqueEnseignantFiliere: HistoriqueEnseignantFiliereResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.historiqueEnseignantFiliere.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
