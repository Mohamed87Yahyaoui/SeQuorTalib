import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-smp-graphe',
  templateUrl: './smp-graphe.component.html',
  styleUrls: ['./smp-graphe.component.scss']
})
export class SmpGrapheComponent implements OnInit {
  // account variables
  account!: Account;
  authSubscription?: Subscription;

  chartOptionsmeryem1 = {
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
  chartDatameryem1 = [{ data: [8.89, 13, 17, 13, 15.8, 10], label: 'EER: Energetique et Energie Renouvlable ' }];
  chartLabelsmeryem1 = ['2016', '2017', '2018', '2019'];

  chartOptionsmeryem2 = {
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
  chartDatameryem2 = [
    { data: [10, 20, 2.5, 11, 30, 67], label: 'HEAPC: Physique des Hautes Energie, Astronomie et Physique Computationnelle' }
  ];
  chartLabelsmeryem2 = ['2016', '2017', '2018', '2019'];

  chartOptionsmeryem3 = {
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
  chartDatameryem3 = [
    { data: [3, 16, 89, 7], label: 'Deug' },
    { data: [44, 34, 56, 9], label: 'Licence' }
  ];
  chartLabelsmeryem3 = ['2016', '2017', '2018', '2019'];

  chartOptionsmeryem4 = {
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
  chartDatameryem4 = [
    { data: [35, 13, 9, 74], label: 'Deug' },
    { data: [1.5, 33, 9, 44], label: 'Licence' }
  ];
  chartLabelsmeryem4 = ['2016', '2017', '2018', '2019'];

  chartOptionsmeryem5 = {
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
  chartDatameryem5 = [
    { data: [3, 16, 8, 44], label: 'Deug' },
    { data: [5, 9, 7, 4], label: 'Licence' }
  ];
  chartLabelsmeryem5 = ['2016', '2017', '2018', '2019'];

  chartOptionsmeryem6 = {
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
  chartDatameryem6 = [
    { data: [98, 55, 5, 4], label: 'Deug' },
    { data: [23, 54, 55, 0], label: 'Licence' }
  ];
  chartLabelsmeryem6 = ['2016', '2017', '2018', '2019'];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }
}
