import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;

  chartOptions1 = {
    responsive: true
  };
  chartData1 = [{ data: [330, 600, 260, 700], label: 'IOT: Internet Of Things' }];
  chartLabels1 = ['2016', '2017', '2018', '2016'];

  chartOptions2 = {
    responsive: true
  };
  chartData2 = [{ data: [33, 6, 26, 100], label: 'IDDL: Ingenierie des Données et Developpement Logiciel' }];
  chartLabels2 = ['2016', '2017', '2018', '2016'];

  chartOptions3 = {
    responsive: true
  };
  chartData3 = [
    { data: [390, 200, 260, 700], label: 'Deug' },
    { data: [80, 60, 260, 700], label: 'Licence' }
  ];
  chartLabels3 = ['2016', '2017', '2018', '2016'];

  chartOptions4 = {
    responsive: true
  };
  chartData4 = [
    { data: [39, 20, 26, 700], label: 'Deug' },
    { data: [80, 60, 28, 90], label: 'Licence' }
  ];
  chartLabels4 = ['2016', '2017', '2018', '2016'];

  chartOptions5 = {
    responsive: true
  };
  chartData5 = [
    { data: [39, 20, 26, 700], label: 'IOT' },
    { data: [80, 60, 28, 90], label: 'IDDL' },
    { data: [80, 60, 28, 90], label: 'TES' }
  ];
  chartLabels5 = ['2016', '2017', '2018', '2016'];

  constructor(private accountService: AccountService, private loginModalService: LoginModalService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
