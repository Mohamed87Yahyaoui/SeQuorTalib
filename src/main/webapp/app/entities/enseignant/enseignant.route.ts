import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEnseignant, Enseignant } from 'app/shared/model/enseignant.model';
import { EnseignantService } from './enseignant.service';
import { EnseignantComponent } from './enseignant.component';
import { EnseignantDetailComponent } from './enseignant-detail.component';
import { EnseignantUpdateComponent } from './enseignant-update.component';

@Injectable({ providedIn: 'root' })
export class EnseignantResolve implements Resolve<IEnseignant> {
  constructor(private service: EnseignantService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEnseignant> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((enseignant: HttpResponse<Enseignant>) => {
          if (enseignant.body) {
            return of(enseignant.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Enseignant());
  }
}

export const enseignantRoute: Routes = [
  {
    path: '',
    component: EnseignantComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'sequortalibApp.enseignant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EnseignantDetailComponent,
    resolve: {
      enseignant: EnseignantResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.enseignant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EnseignantUpdateComponent,
    resolve: {
      enseignant: EnseignantResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.enseignant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EnseignantUpdateComponent,
    resolve: {
      enseignant: EnseignantResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.enseignant.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
