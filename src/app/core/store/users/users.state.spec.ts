import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { UsersState, UsersStateModel } from './users.state';
import { GetUsers } from './users.actions';

describe('Users store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([UsersState])]

    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: UsersStateModel = {
      users: [{ firstName: "Harshana", lastName: "Bandara", id: 0 }, { firstName: "Harshana", lastName: "Bandara", id: 1 }, { firstName: "Harshana", lastName: "Bandara", id: 2 }]
    };
    store.dispatch(new GetUsers({ page: 0, limit: 3 }));
    const actual = store.selectSnapshot(UsersState.getState);
    expect(actual).toEqual(expected);
  });

});
