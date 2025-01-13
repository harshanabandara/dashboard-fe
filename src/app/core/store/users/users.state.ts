import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CreateUser, DeleteUser, EditUser, GetUsers } from './users.actions';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';
import { User } from '../../../models/user';

export interface UsersStateModel {
  users: { firstName: string, lastName: string, id: number }[];
  totalUsers: number;
  currPage: number;
  limit: number;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: [{ firstName: "Harshana", lastName: "Bandara", id: 0 }, { firstName: "Harshana", lastName: "Bandara", id: 1 }, { firstName: "Harshana", lastName: "Bandara", id: 2 }],
    totalUsers: 0,
    currPage: 0,
    limit: 5
  }
})
@Injectable()
export class UsersState {

  constructor(private userService: UserService) { }

  @Selector()
  static getState(state: UsersStateModel) {
    return state;
  }

  @Action(GetUsers)
  getUsers(ctx: StateContext<UsersStateModel>, { payload }: GetUsers) {
    return this.userService.getUsers(payload).pipe(
      tap((result: any) => {
        if (result && result.content !== undefined) {
          const newState = {
            users: result.content ?? [],
            totalUsers: result.totalElements,
            currPage: result.pageable.pageNumber,
            limit: result.size
          }
          ctx.setState(newState);
        }
        console.log(result)
      })
    )
  }

  @Action(CreateUser)
  CreateUser(ctx: StateContext<UsersStateModel>, { payload }: CreateUser) {
    return this.userService.postUser(payload).pipe(
      tap((result) => {
        console.log(result)
      })
    )
  }

  @Action(EditUser)
  EditUser(ctx: StateContext<UsersStateModel>, { payload }: EditUser) {
    return this.userService.putUser(payload).pipe(
      tap((result) => {
        console.log(result)
      })
    )
  }

  @Action(DeleteUser)
  DeleteUser(tx: StateContext<UsersStateModel>, { payload }: DeleteUser) {
    return this.userService.deleteUser(payload).pipe(
      tap((result) => {
        console.log("User Deleted", result)
      })
    )
  }

}
