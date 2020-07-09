import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFiliere, Filiere } from 'app/shared/model/filiere.model';
import { FiliereService } from './filiere.service';
import { FiliereComponent } from './filiere.component';
import { FiliereDetailComponent } from './filiere-detail.component';
import { FiliereUpdateComponent } from './filiere-update.component';

@Injectable({ providedIn: 'root' })
export class FiliereResolve implements Resolve<IFiliere> {
  constructor(private service: FiliereService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFiliere> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((filiere: HttpResponse<Filiere>) => {
          if (filiere.body) {
            return of(filiere.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Filiere());
  }
}

export const filiereRoute: Routes = [
  {
    path: '',
    component: FiliereComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.filiere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FiliereDetailComponent,
    resolve: {
      filiere: FiliereResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.filiere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FiliereUpdateComponent,
    resolve: {
      filiere: FiliereResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.filiere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FiliereUpdateComponent,
    resolve: {
      filiere: FiliereResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.filiere.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
