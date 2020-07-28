import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHistoriqueEtudiantFiliere, HistoriqueEtudiantFiliere } from 'app/shared/model/historique-etudiant-filiere.model';
import { HistoriqueEtudiantFiliereService } from './historique-etudiant-filiere.service';
import { HistoriqueEtudiantFiliereComponent } from './historique-etudiant-filiere.component';
import { HistoriqueEtudiantFiliereDetailComponent } from './historique-etudiant-filiere-detail.component';
import { HistoriqueEtudiantFiliereUpdateComponent } from './historique-etudiant-filiere-update.component';

@Injectable({ providedIn: 'root' })
export class HistoriqueEtudiantFiliereResolve implements Resolve<IHistoriqueEtudiantFiliere> {
  constructor(private service: HistoriqueEtudiantFiliereService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistoriqueEtudiantFiliere> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((historiqueEtudiantFiliere: HttpResponse<HistoriqueEtudiantFiliere>) => {
          if (historiqueEtudiantFiliere.body) {
            return of(historiqueEtudiantFiliere.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HistoriqueEtudiantFiliere());
  }
}

export const historiqueEtudiantFiliereRoute: Routes = [
  {
    path: '',
    component: HistoriqueEtudiantFiliereComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.historiqueEtudiantFiliere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HistoriqueEtudiantFiliereDetailComponent,
    resolve: {
      historiqueEtudiantFiliere: HistoriqueEtudiantFiliereResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.historiqueEtudiantFiliere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HistoriqueEtudiantFiliereUpdateComponent,
    resolve: {
      historiqueEtudiantFiliere: HistoriqueEtudiantFiliereResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.historiqueEtudiantFiliere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HistoriqueEtudiantFiliereUpdateComponent,
    resolve: {
      historiqueEtudiantFiliere: HistoriqueEtudiantFiliereResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.historiqueEtudiantFiliere.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
