import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-smi-etudiants',
  templateUrl: './smi-etudiants.component.html',
  styleUrls: ['./smi-etudiants.component.scss']
})
export class SmiEtudiantsComponent implements OnInit {
  account!: Account;
  authSubscription?: Subscription;

  notemohamed = false;

  etudiants = [
    {
      code: '487655',
      nom: 'Yahyaoui',
      prenom: 'Mohamed',
      semestre: '5',
      section: 'A'
    }
  ];

  chartOptionmohamed1 = {
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
  chartDatamohamed1 = [{ data: [6, 10.5, 10.25, 7.5, 12.0, 13.5, 13.5] }];
  chartLabelsmohamed1 = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7'];

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }

  shownotemohamed(): void {
    this.notemohamed = true;
    this.router.navigateByUrl('/noteSMI');
  }
}
