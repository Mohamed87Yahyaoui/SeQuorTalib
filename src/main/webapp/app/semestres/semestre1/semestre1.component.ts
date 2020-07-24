import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-semestre1',
  templateUrl: './semestre1.component.html',
  styleUrls: ['./semestre1.component.scss']
})
export class Semestre1Component implements OnInit {
  // account variables
  account!: Account;
  authSubscription?: Subscription;

  chartOptions1mohamed = {
    legend: {
      display: false
    },
    scale: {
      angleLines: {
        display: false
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 20
      }
    }
  };
  chartData1mohamed = [{ data: [6, 10.5, 10.25, 7.5, 12.0, 13.5, 13.5] }];
  chartLabels1mohamed = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7'];

  chartOptions1meryem = {
    legend: {
      display: false
    },
    scale: {
      angleLines: {
        display: false
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 20
      }
    }
  };
  chartData1meryem = [{ data: [12.5, 9.5, 15.25, 7.5, 17.0, 11.0, 10.0] }];
  chartLabels1meryem = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7'];

  chartOptions1rachid = {
    legend: {
      display: false
    },
    scale: {
      angleLines: {
        display: false
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 20
      }
    }
  };
  chartData1rachid = [{ data: [16, 12, 6.75, 13, 9, 16, 16] }];
  chartLabels1rachid = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7'];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }
}
