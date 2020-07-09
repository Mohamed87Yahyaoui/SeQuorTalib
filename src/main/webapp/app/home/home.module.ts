import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SequortalibSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [SequortalibSharedModule, RouterModule.forChild([HOME_ROUTE]), ChartsModule],
  declarations: [HomeComponent]
})
export class SequortalibHomeModule {}
