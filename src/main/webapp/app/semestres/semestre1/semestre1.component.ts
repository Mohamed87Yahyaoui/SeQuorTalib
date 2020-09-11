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

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }
}
