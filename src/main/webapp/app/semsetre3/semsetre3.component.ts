import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-semsetre3',
  templateUrl: './semsetre3.component.html',
  styleUrls: ['./semsetre3.component.scss']
})
export class Semsetre3Component implements OnInit {
  // account variables
  account!: Account;
  authSubscription?: Subscription;

  chartOptions3mohamed = {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            max: 20,
            beginAtZero: true
          }
        }
      ]
    }
  };
  chartData3mohamed = [{ data: [16.62, 19, 14, 9.89, 8, 18.62] }];
  chartLabels3mohamed = ['M15', 'M16', 'M17', 'M18', 'M19', 'M20'];

  chartOptions3meryem = {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            max: 20,
            beginAtZero: true
          }
        }
      ]
    }
  };
  chartData3meryem = [{ data: [20, 7, 12, 8, 7.5, 15] }];
  chartLabels3meryem = ['M15', 'M16', 'M17', 'M18', 'M19', 'M20'];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }
}
