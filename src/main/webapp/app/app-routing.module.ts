import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/shared/constants/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Semestre1Component } from 'app/semestres/semestre1/semestre1.component';
import { Semestre2Component } from 'app/semestres/semestre2/semestre2.component';
import { Semsetre3Component } from 'app/semsetre3/semsetre3.component';
import { Semsetre4Component } from 'app/semsetre4/semsetre4.component';
import { Semsetre5Component } from 'app/semsetre5/semsetre5.component';
import { SmiGrapheComponent } from './smi-graphe/smi-graphe.component';
import { SmpGrapheComponent } from './smp-graphe/smp-graphe.component';
import { SvtGrapheComponent } from './svt-graphe/svt-graphe.component';
import { SmiEtudiantsComponent } from './smi-etudiants/smi-etudiants.component';
import { SmpEtudiantsComponent } from './smp-etudiants/smp-etudiants.component';
import { SvtEtudiantsComponent } from './svt-etudiants/svt-etudiants.component';
import { NoteetudiantsComponent } from './noteetudiants/noteetudiants.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'note',
          component: NoteetudiantsComponent
        },
        {
          path: 'SmiEtudiant',
          component: SmiEtudiantsComponent
        },
        {
          path: 'SmpEtudiant',
          component: SmpEtudiantsComponent
        },
        {
          path: 'SvtEtudiant',
          component: SvtEtudiantsComponent
        },
        {
          path: 'GrapheSMI',
          component: SmiGrapheComponent
        },
        {
          path: 'GrapheSMP',
          component: SmpGrapheComponent
        },
        {
          path: 'GrapheSVT',
          component: SvtGrapheComponent
        },
        {
          path: 'notesS1',
          component: Semestre1Component
        },
        {
          path: 'notesS2',
          component: Semestre2Component
        },
        {
          path: 'notesS3',
          component: Semsetre3Component
        },
        {
          path: 'notesS4',
          component: Semsetre4Component
        },
        {
          path: 'notesS5',
          component: Semsetre5Component
        },
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN]
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class SequortalibAppRoutingModule {}
