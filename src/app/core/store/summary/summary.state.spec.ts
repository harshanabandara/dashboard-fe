import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { SummaryState, SummaryStateModel } from './summary.state';
import { SummaryAction } from './summary.actions';

describe('Summary store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([SummaryState])]
      
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: SummaryStateModel = {
      items: ['item-1']
    };
    store.dispatch(new SummaryAction('item-1'));
    const actual = store.selectSnapshot(SummaryState.getState);
    expect(actual).toEqual(expected);
  });

});
