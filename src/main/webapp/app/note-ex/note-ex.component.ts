import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-note-ex',
  templateUrl: './note-ex.component.html',
  styleUrls: ['./note-ex.component.scss']
})
export class NoteExComponent implements OnInit {
  // account variables
  account!: Account;
  authSubscription?: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account as Account));
  }
}
