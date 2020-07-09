import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEtablissement, Etablissement } from 'app/shared/model/etablissement.model';
import { EtablissementService } from './etablissement.service';
import { EtablissementComponent } from './etablissement.component';
import { EtablissementDetailComponent } from './etablissement-detail.component';
import { EtablissementUpdateComponent } from './etablissement-update.component';

@Injectable({ providedIn: 'root' })
export class EtablissementResolve implements Resolve<IEtablissement> {
  constructor(private service: EtablissementService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEtablissement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((etablissement: HttpResponse<Etablissement>) => {
          if (etablissement.body) {
            return of(etablissement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Etablissement());
  }
}

export const etablissementRoute: Routes = [
  {
    path: '',
    component: EtablissementComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.etablissement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EtablissementDetailComponent,
    resolve: {
      etablissement: EtablissementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.etablissement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EtablissementUpdateComponent,
    resolve: {
      etablissement: EtablissementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.etablissement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EtablissementUpdateComponent,
    resolve: {
      etablissement: EtablissementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.etablissement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
