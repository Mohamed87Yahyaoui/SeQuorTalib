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

  chartOptionsmohamed1 = {
    responsive: true
  };
  chartDatamohamed1 = [{ data: [330, 600, 260, 700], label: 'IOT: Internet Of Things' }];
  chartLabelsmohamed1 = ['2016', '2017', '2018', '2016'];

  chartOptionsmohamed2 = {
    responsive: true
  };
  chartDatamohamed2 = [{ data: [33, 6, 26, 100], label: 'IDDL: Ingenierie des Données et Developpement Logiciel' }];
  chartLabelsmohamed2 = ['2016', '2017', '2018', '2016'];

  chartOptionsmohamed3 = {
    responsive: true
  };
  chartDatamohamed3 = [{ data: [33, 6, 26, 100], label: 'TIS: Traitement Intelligent des Systèmes ' }];
  chartLabelsmohamed3 = ['2016', '2017', '2018', '2016'];

  chartOptionsmohamed4 = {
    responsive: true
  };
  chartDatamohamed4 = [
    { data: [390, 200, 260, 700], label: 'Deug' },
    { data: [80, 60, 260, 700], label: 'Licence' }
  ];
  chartLabelsmohamed4 = ['2016', '2017', '2018', '2016'];

  chartOptionsmohamed5 = {
    responsive: true
  };
  chartDatamohamed5 = [
    { data: [39, 20, 26, 700], label: 'Deug' },
    { data: [80, 60, 28, 90], label: 'Licence' }
  ];
  chartLabelsmohamed5 = ['2016', '2017', '2018', '2016'];

  chartOptionsmohamed6 = {
    responsive: true
  };
  chartDatamohamed6 = [
    { data: [3, 2, 26, 70], label: 'Deug' },
    { data: [8, 60, 28, 0], label: 'Licence' }
  ];
  chartLabelsmohamed6 = ['2016', '2017', '2018', '2016'];

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
