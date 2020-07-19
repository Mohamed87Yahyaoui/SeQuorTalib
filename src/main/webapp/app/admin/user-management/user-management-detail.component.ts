import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/core/user/user.model';
import { UserManagementDeleteDialogComponent } from './user-management-delete-dialog.component';
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

  deleteUser(user: User): void {
    const modalRef = this.modalService.open(UserManagementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.user = user;
  }
}
