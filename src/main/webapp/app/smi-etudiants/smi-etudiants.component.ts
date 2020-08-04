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

  chartDatamohamed1 = [{ data: [6, 10.5, 10.25, 7.5] }];
  chartLabelsmohamed1 = ['Moy S1', 'Moy S2', 'Moy S3', 'Moy S4'];

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }

  shownotemohamed(): void {
    this.notemohamed = true;
    this.router.navigateByUrl('/noteSMI');
  }
}
