import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-semestre2',
  templateUrl: './semestre2.component.html',
  styleUrls: ['./semestre2.component.scss']
})
export class Semestre2Component implements OnInit {
  // account variables
  account!: Account;
  authSubscription?: Subscription;

  chartOptions2mohamed = {
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
  chartData2mohamed = [{ data: [17, 16, 14, 14.72, 11.25, 14, 16.38] }];
  chartLabels2mohamed = ['M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14'];

  chartOptions2meryem = {
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
  chartData2meryem = [{ data: [18, 11, 8.5, 19, 10, 16.5, 17] }];
  chartLabels2meryem = ['M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14'];

  chartOptions1rachid = {
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
  chartData1rachid = [{ data: [16, 12, 6.75, 13, 9, 16, 16] }];
  chartLabels1rachid = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7'];

  chartOptions2rachid = {
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
  chartData2rachid = [{ data: [8, 18, 11, 18, 14.66, 19, 16] }];
  chartLabels2rachid = ['M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14'];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }
}
