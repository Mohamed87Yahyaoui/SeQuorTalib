import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDepartement, Departement } from 'app/shared/model/departement.model';
import { DepartementService } from './departement.service';
import { DepartementComponent } from './departement.component';
import { DepartementDetailComponent } from './departement-detail.component';
import { DepartementUpdateComponent } from './departement-update.component';

@Injectable({ providedIn: 'root' })
export class DepartementResolve implements Resolve<IDepartement> {
  constructor(private service: DepartementService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepartement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((departement: HttpResponse<Departement>) => {
          if (departement.body) {
            return of(departement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Departement());
  }
}

export const departementRoute: Routes = [
  {
    path: '',
    component: DepartementComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'sequortalibApp.departement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DepartementDetailComponent,
    resolve: {
      departement: DepartementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.departement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DepartementUpdateComponent,
    resolve: {
      departement: DepartementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.departement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DepartementUpdateComponent,
    resolve: {
      departement: DepartementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.departement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
