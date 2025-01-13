import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UsersState } from '../../core/store/users/users.state';
import { CommonModule } from '@angular/common';
import { NewUserComponent } from "../new-user/new-user.component";
import { UserComponent } from "../user/user.component";
import { PaginationComponent } from "../pagination/pagination.component";
import { GetUsers } from '../../core/store/users/users.actions';
@Component({
  selector: 'app-user-management',
  imports: [CommonModule, NewUserComponent, UserComponent, PaginationComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  store = inject(Store)
  usersSignal = this.store.selectSignal(UsersState.getState)

  deleteUser(arg0: any) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.store.dispatch(new GetUsers({ page: this.usersSignal().currPage, limit: this.usersSignal().limit }))
    console.log(this.usersSignal().users)
  }
}
