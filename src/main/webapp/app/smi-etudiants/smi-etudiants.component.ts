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

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }

  shownotemohamed(): void {
    this.notemohamed = true;
    this.router.navigateByUrl('url: /note');
  }
}
