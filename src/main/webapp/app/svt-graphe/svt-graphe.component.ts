import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-svt-graphe',
  templateUrl: './svt-graphe.component.html',
  styleUrls: ['./svt-graphe.component.scss']
})
export class SvtGrapheComponent implements OnInit {
  // account variables
  account!: Account;
  authSubscription?: Subscription;

  chartOptionsrachid1 = {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            max: 100,
            beginAtZero: true
          }
        }
      ]
    }
  };
  chartDatarachid1 = [{ data: [44, 34, 56, 9], label: 'BMG: Biologie Moleculaire et Génétique' }];
  chartLabelsrachid1 = ['2016', '2017', '2018', '2019'];

  chartOptionsrachid2 = {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            max: 100,
            beginAtZero: true
          }
        }
      ]
    }
  };
  chartDatarachid2 = [{ data: [44, 34, 56, 9], label: 'BEC: Biologie des Changement Environnementaux' }];
  chartLabelsrachid2 = ['2016', '2017', '2018', '2019'];

  chartOptionsrachid3 = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            max: 100,
            beginAtZero: true
          }
        }
      ]
    }
  };
  chartDatarachid3 = [{ data: [44, 34, 56, 9] }];
  chartLabelsrachid3 = ['2016', '2017', '2018', '2019'];

  chartOptionsrachid4 = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            max: 100,
            beginAtZero: true
          }
        }
      ]
    }
  };
  chartDatarachid4 = [{ data: [44, 34, 56, 9] }];
  chartLabelsrachid4 = ['2016', '2017', '2018', '2019'];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }
}
