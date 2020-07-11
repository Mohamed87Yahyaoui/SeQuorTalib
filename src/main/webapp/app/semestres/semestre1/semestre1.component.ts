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

  chartOptions1 = {
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
  chartData1 = [
    { data: [390, 200, 260, 700], label: 'Deug' },
    { data: [80, 60, 260, 700], label: 'Licence' }
  ];
  chartLabels1 = ['2016', '2017', '2018', '2016'];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }
}
