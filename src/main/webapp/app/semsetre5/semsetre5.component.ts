import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-semsetre5',
  templateUrl: './semsetre5.component.html',
  styleUrls: ['./semsetre5.component.scss']
})
export class Semsetre5Component implements OnInit {
  account!: Account;
  authSubscription?: Subscription;

  chartOptions5meryem = {
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
  chartData5meryem = [{ data: [13.77, 18, 9.98, 10, 6, 9] }];
  chartLabels5meryem = ['M21', 'M22', 'M23', 'M24', 'M25', 'M26'];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }
}
