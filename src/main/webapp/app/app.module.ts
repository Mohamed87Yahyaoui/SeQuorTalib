import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { SequortalibSharedModule } from 'app/shared/shared.module';
import { SequortalibCoreModule } from 'app/core/core.module';
import { SequortalibAppRoutingModule } from './app-routing.module';
import { SequortalibHomeModule } from './home/home.module';
import { SequortalibEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { Semestre1Component } from './semestres/semestre1/semestre1.component';
import { Semestre2Component } from './semestres/semestre2/semestre2.component';
import { ChartsModule } from 'ng2-charts';
import { Semsetre3Component } from './semsetre3/semsetre3.component';
import { Semsetre4Component } from './semsetre4/semsetre4.component';
import { Semsetre5Component } from './semsetre5/semsetre5.component';

@NgModule({
  imports: [
    BrowserModule,
    SequortalibSharedModule,
    SequortalibCoreModule,
    SequortalibHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SequortalibEntityModule,
    SequortalibAppRoutingModule,
    ChartsModule
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    Semestre1Component,
    Semestre2Component,
    Semsetre3Component,
    Semsetre4Component,
    Semsetre5Component
  ],
  bootstrap: [MainComponent],
  providers: [NavbarComponent]
})
export class SequortalibAppModule {}
