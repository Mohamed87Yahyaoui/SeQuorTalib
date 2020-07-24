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
  chartData2mohamed = [{ data: [17, 16, 14, 14.72, 11.25, 14, 16.38] }];
  chartLabels2mohamed = ['M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14'];

  chartOptions2meryem = {
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
  chartData2meryem = [{ data: [18, 11, 8.5, 19, 10, 16.5, 17] }];
  chartLabels2meryem = ['M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14'];

  chartOptions2rachid = {
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
  chartData2rachid = [{ data: [8, 18, 11, 18, 14.66, 19, 16] }];
  chartLabels2rachid = ['M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14'];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }
}
