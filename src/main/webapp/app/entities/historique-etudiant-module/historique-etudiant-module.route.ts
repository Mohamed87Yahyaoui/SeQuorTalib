import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHistoriqueEtudiantModule, HistoriqueEtudiantModule } from 'app/shared/model/historique-etudiant-module.model';
import { HistoriqueEtudiantModuleService } from './historique-etudiant-module.service';
import { HistoriqueEtudiantModuleComponent } from './historique-etudiant-module.component';
import { HistoriqueEtudiantModuleDetailComponent } from './historique-etudiant-module-detail.component';
import { HistoriqueEtudiantModuleUpdateComponent } from './historique-etudiant-module-update.component';

@Injectable({ providedIn: 'root' })
export class HistoriqueEtudiantModuleResolve implements Resolve<IHistoriqueEtudiantModule> {
  constructor(private service: HistoriqueEtudiantModuleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistoriqueEtudiantModule> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((historiqueEtudiantModule: HttpResponse<HistoriqueEtudiantModule>) => {
          if (historiqueEtudiantModule.body) {
            return of(historiqueEtudiantModule.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HistoriqueEtudiantModule());
  }
}

export const historiqueEtudiantModuleRoute: Routes = [
  {
    path: '',
    component: HistoriqueEtudiantModuleComponent,
    data: {
      authorities: [Authority.ETUDIANT, Authority.ADMIN],
      pageTitle: 'sequortalibApp.historiqueEtudiantModule.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HistoriqueEtudiantModuleDetailComponent,
    resolve: {
      historiqueEtudiantModule: HistoriqueEtudiantModuleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.historiqueEtudiantModule.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HistoriqueEtudiantModuleUpdateComponent,
    resolve: {
      historiqueEtudiantModule: HistoriqueEtudiantModuleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.historiqueEtudiantModule.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HistoriqueEtudiantModuleUpdateComponent,
    resolve: {
      historiqueEtudiantModule: HistoriqueEtudiantModuleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sequortalibApp.historiqueEtudiantModule.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
