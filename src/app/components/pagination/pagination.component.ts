import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { UsersState } from '../../core/store/users/users.state';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUsers } from '../../core/store/users/users.actions';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  store = inject(Store)
  usersState = this.store.selectSignal(UsersState.getState);


  @Output() pageChanged = new EventEmitter<{ page: number; limit: number }>(); // Emit page and limit
  paginationForm = new FormGroup({
    pageNumber: new FormControl(this.usersState().currPage + 1),
    limit: new FormControl(this.usersState().limit)

  })

  get totalPages(): number {
    // return 5;
    return Math.ceil(this.usersState().totalUsers / this.usersState().limit);
  }

  updateUsers($event: Event) {
    console.log($event, this.paginationForm.value);
    const payload = {
      page: (this.paginationForm.value.pageNumber ?? 1) - 1,
      limit: this.paginationForm.value.limit ?? null
    }
    this.store.dispatch(new GetUsers(payload))
  }
}