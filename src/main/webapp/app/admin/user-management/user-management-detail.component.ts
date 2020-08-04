import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/core/user/user.model';
import { Account } from 'app/core/user/account.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-user-mgmt-detail',
  templateUrl: './user-management-detail.component.html'
})
export class UserManagementDetailComponent implements OnInit {
  user: User | null = null;
  currentAccount: Account | null = null;

  constructor(private route: ActivatedRoute, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ user }) => (this.user = user));
  }

  previousState(): void {
    window.history.back();
  }
}
