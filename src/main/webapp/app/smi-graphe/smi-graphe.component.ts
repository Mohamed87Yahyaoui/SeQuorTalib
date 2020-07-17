import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-smi-graphe',
  templateUrl: './smi-graphe.component.html',
  styleUrls: ['./smi-graphe.component.scss']
})
export class SmiGrapheComponent implements OnInit {
  account!: Account;
  authSubscription?: Subscription;

  // Graphes Mohamed
  chartDatamohamed2 = [{ data: [33, 6, 26, 10], label: 'IDDL: Ingenierie des Données et Developpement Logiciel' }];
  chartLabelsmohamed2 = ['2016', '2017', '2018', '2016'];
  chartDatamohamed1 = [{ data: [33, 60, 13, 89], label: 'IOT: Internet Of Things' }];
  chartLabelsmohamed1 = ['2016', '2017', '2018', '2016'];

  chartOptionsmohamed1 = {
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

  chartOptionsmohamed2 = {
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

  chartDatamohamed3 = [{ data: [33, 6, 26, 50], label: 'TIS: Traitement Intelligent des Systèmes ' }];
  chartLabelsmohamed3 = ['2016', '2017', '2018', '2016'];

  chartOptionsmohamed4 = {
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
  chartDatamohamed4 = [
    { data: [39, 20, 26, 10], label: 'Deug' },
    { data: [80, 60, 12, 8], label: 'Licence' }
  ];

  chartOptionsmohamed3 = {
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

  chartLabelsmohamed4 = ['2016', '2017', '2018', '2016'];
  chartOptionsmohamed5 = {
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
  chartDatamohamed5 = [
    { data: [39, 20, 26, 70], label: 'Deug' },
    { data: [80, 60, 28, 90], label: 'Licence' }
  ];
  chartLabelsmohamed5 = ['2016', '2017', '2018', '2016'];

  chartOptionsmohamed6 = {
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
  chartDatamohamed6 = [
    { data: [3, 2, 26, 70], label: 'Deug' },
    { data: [8, 60, 28, 0], label: 'Licence' }
  ];
  chartLabelsmohamed6 = ['2016', '2017', '2018', '2016'];

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
