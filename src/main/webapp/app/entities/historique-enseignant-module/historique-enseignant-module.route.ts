import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHistoriqueEnseignantModule, HistoriqueEnseignantModule } from 'app/shared/model/historique-enseignant-module.model';
import { HistoriqueEnseignantModuleService } from './historique-enseignant-module.service';
import { HistoriqueEnseignantModuleComponent } from './historique-enseignant-module.component';
import { HistoriqueEnseignantModuleDetailComponent } from './historique-enseignant-module-detail.component';
import { HistoriqueEnseignantModuleUpdateComponent } from './historique-enseignant-module-update.component';

@Injectable({ providedIn: 'root' })
export class HistoriqueEnseignantModuleResolve implements Resolve<IHistoriqueEnseignantModule> {
  constructor(private service: HistoriqueEnseignantModuleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistoriqueEnseignantModule> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((historiqueEnseignantModule: HttpResponse<HistoriqueEnseignantModule>) => {
          if (historiqueEnseignantModule.body) {
            return of(historiqueEnseignantModule.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HistoriqueEnseignantModule());
  }
}

export const historiqueEnseignantModuleRoute: Routes = [
  {
    path: '',
    component: HistoriqueEnseignantModuleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.historiqueEnseignantModule.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HistoriqueEnseignantModuleDetailComponent,
    resolve: {
      historiqueEnseignantModule: HistoriqueEnseignantModuleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.historiqueEnseignantModule.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HistoriqueEnseignantModuleUpdateComponent,
    resolve: {
      historiqueEnseignantModule: HistoriqueEnseignantModuleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.historiqueEnseignantModule.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HistoriqueEnseignantModuleUpdateComponent,
    resolve: {
      historiqueEnseignantModule: HistoriqueEnseignantModuleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.historiqueEnseignantModule.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
