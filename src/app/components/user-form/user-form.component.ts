import { Component, EventEmitter, inject, Input, input, OnChanges, OnInit, Output, Signal, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { CreateUser, DeleteUser, EditUser, GetUsers } from '../../core/store/users/users.actions';
import { UsersState, UsersStateModel } from '../../core/store/users/users.state';
import { GetSummary } from '../../core/store/summary/summary.actions';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnChanges {

  @Input() isNew = false;
  @Input() isEdit = false;
  @Input() user: User = { firstName: '', lastName: '' }

  store = inject(Store)
  userState: Signal<UsersStateModel> = this.store.selectSignal(UsersState.getState)
  @Output() stateChanged = new EventEmitter<UsersStateModel>()


  userForm = new FormGroup({
    firstName: new FormControl({ value: this.user.firstName, disabled: !this.isNew }, Validators.required),
    lastName: new FormControl({ value: this.user.firstName, disabled: !this.isNew }, Validators.required)
  })

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isNew'] && changes['isNew'].currentValue) {
      console.log("change detected");
      this.userForm.get('firstName')?.enable()
      this.userForm.get('lastName')?.enable()
    }

    if (changes['user'] && changes['user'].currentValue) {
      this.userForm.patchValue({
        firstName: this.user.firstName ?? '',
        lastName: this.user.lastName ?? ''
      })
    }
    if (!this.isNew) {
      this.isEdit = false;
    }
    console.log(this.user)
  }
  onEdit() {
    //toggle edit button if edit was set to false. 
    if (!this.isEdit) {
      this.isEdit = true
    } else {
      if (this.user.userId == undefined) {
        console.log("user sucks", this.user)
        return;
      }
      // this.store.dispatch(PutU)
      const payload = {
        //BE VERY CAREFUL HERE.
        //TODO handle this. 
        id: this.user.userId ?? 0,
        user: {
          firstName: this.userForm.value.firstName ?? this.user.firstName,
          lastName: this.userForm.value.lastName ?? this.user.lastName
        }
      }
      this.store.dispatch(new EditUser(payload)).subscribe(() => {
        this.refresh()
      })
      this.isEdit = false
    }

    if (this.isEdit) {
      this.userForm.get('firstName')?.enable()
      this.userForm.get('lastName')?.enable()
    } else {
      this.userForm.get('firstName')?.disable()
      this.userForm.get('lastName')?.disable()
    }
  }
  onAdd() {
    if (this.userForm.value.firstName && this.userForm.value.firstName) {
      const payload = {
        firstName: this.userForm.value.firstName ?? "",
        lastName: this.userForm.value.lastName ?? ""
      }
      this.store.dispatch(new CreateUser(payload)).subscribe(() => {
        this.refresh()
      })
    }
  }

  refresh() {
    const page = this.store.selectSnapshot(UsersState.getState).currPage;
    const limit = this.store.selectSnapshot(UsersState.getState).limit;
    this.store.dispatch(new GetUsers({ page: page, limit: limit })).subscribe(() => {
      const newState = this.store.selectSnapshot(UsersState.getState)
      this.store.dispatch(new GetSummary())
      this.stateChanged.emit(newState)
    })
  }

  onDelete() {
    console.log("deleting user: ", this.user)
    if (this.user.userId) {
      this.store.dispatch(new DeleteUser({ id: this.user.userId ?? 0 })).subscribe(() => {
        this.refresh()
      })
    }

  }
}
