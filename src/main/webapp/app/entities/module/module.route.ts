import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IModule, Module } from 'app/shared/model/module.model';
import { ModuleService } from './module.service';
import { ModuleComponent } from './module.component';
import { ModuleDetailComponent } from './module-detail.component';
import { ModuleUpdateComponent } from './module-update.component';

@Injectable({ providedIn: 'root' })
export class ModuleResolve implements Resolve<IModule> {
  constructor(private service: ModuleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IModule> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((module: HttpResponse<Module>) => {
          if (module.body) {
            return of(module.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Module());
  }
}

export const moduleRoute: Routes = [
  {
    path: '',
    component: ModuleComponent,
    data: {
      authorities: [Authority.ADMIN, Authority.ENSEIGNANT, Authority.ETUDIANT],
      pageTitle: 'sequortalibApp.module.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ModuleDetailComponent,
    resolve: {
      module: ModuleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.module.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ModuleUpdateComponent,
    resolve: {
      module: ModuleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.module.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ModuleUpdateComponent,
    resolve: {
      module: ModuleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.module.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
