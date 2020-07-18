import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SequortalibSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardEtudiantComponent } from 'app/home/dashboard-etudiant/dashboard-etudiant.component';
import { DashboardEnseignantComponent } from 'app/home/dashboard-enseignant/dashboard-enseignant.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [NgbModule, BrowserModule, SequortalibSharedModule, RouterModule.forChild([HOME_ROUTE]), ChartsModule],
  declarations: [HomeComponent, DashboardEtudiantComponent, DashboardEnseignantComponent]
})
export class SequortalibHomeModule {}
