import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-smp-etudiants',
  templateUrl: './smp-etudiants.component.html',
  styleUrls: ['./smp-etudiants.component.scss']
})
export class SmpEtudiantsComponent implements OnInit {
  account!: Account;
  authSubscription?: Subscription;

  notemeryem = false;

  etudiants = [
    {
      code: '58993',
      nom: 'Sassy',
      prenom: 'Meryem',
      semestre: '6',
      section: 'B'
    }
  ];

  chartDatameryem1 = [{ data: [11.12, 14.32, 14.35, 11.89, 15.3] }];
  chartLabelsmeryem1 = ['Moy S1', 'Moy S2', 'Moy S3', 'Moy S4', 'Moy S5'];

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }

  shownotemeryem(): void {
    this.notemeryem = true;
    this.router.navigateByUrl('/noteSMP');
  }
}
