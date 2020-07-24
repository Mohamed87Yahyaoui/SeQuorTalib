import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-semsetre4',
  templateUrl: './semsetre4.component.html',
  styleUrls: ['./semsetre4.component.scss']
})
export class Semsetre4Component implements OnInit {
  account!: Account;
  authSubscription?: Subscription;

  chartOptions4mohamed = {
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
  chartData4mohamed = [{ data: [10, 11, 9, 7, 17.5, 15.25] }];
  chartLabels4mohamed = ['M16', 'M17', 'M18', 'M19', 'M20', 'M21'];

  chartOptions4meryem = {
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
  chartData4meryem = [{ data: [8.89, 13, 17, 13, 15.8, 10] }];
  chartLabels4meryem = ['M15', 'M16', 'M17', 'M18', 'M19', 'M20'];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }
}
