export class CreateUser {
  static readonly type = '[Users] Create';
  constructor(readonly payload: { firstName: string, lastName: string }) { }
}

export class GetUsers {
  static readonly type = '[Users] Get';
  constructor(
    public payload: {
      page: number | null,
      limit: number | null
    }
  ) { }
}

export class EditUser {
  static readonly type = '[Users] Edit'
  constructor(
    public payload: {
      id: number,
      user: { firstName: string, lastName: string }
    }
  ) { }
}

export class DeleteUser {
  static readonly type = '[Users] Delete'
  constructor(public payload: { id: number }) { }
}
