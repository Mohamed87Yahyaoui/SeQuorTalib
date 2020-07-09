import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEtudiant, Etudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from './etudiant.service';
import { EtudiantComponent } from './etudiant.component';
import { EtudiantDetailComponent } from './etudiant-detail.component';
import { EtudiantUpdateComponent } from './etudiant-update.component';

@Injectable({ providedIn: 'root' })
export class EtudiantResolve implements Resolve<IEtudiant> {
  constructor(private service: EtudiantService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEtudiant> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((etudiant: HttpResponse<Etudiant>) => {
          if (etudiant.body) {
            return of(etudiant.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Etudiant());
  }
}

export const etudiantRoute: Routes = [
  {
    path: '',
    component: EtudiantComponent,
    data: {
      authorities: [Authority.ENSEIGNANT, Authority.ADMIN],
      pageTitle: 'sequortalibApp.etudiant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EtudiantDetailComponent,
    resolve: {
      etudiant: EtudiantResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.etudiant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EtudiantUpdateComponent,
    resolve: {
      etudiant: EtudiantResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.etudiant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EtudiantUpdateComponent,
    resolve: {
      etudiant: EtudiantResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.etudiant.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
