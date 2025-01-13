import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GetSummary } from './summary.actions';
import { DataService } from '../../services/data.service';
import { tap } from 'rxjs';

export interface SummaryStateModel {
  totalUsers: number;
  lastUserAdded: string;
  userActivity: Record[];
}

export interface Record {
  date: string,
  userCount: number
}



@State<SummaryStateModel>({
  name: 'summary',
  defaults: {
    totalUsers: 0,
    lastUserAdded: '',
    userActivity: []
  }
})
@Injectable()
export class SummaryState {

  private dataService = inject(DataService)

  @Selector()
  static getState(state: SummaryStateModel) {
    return state;
  }

  @Action(GetSummary)
  GetSummary(ctx: StateContext<SummaryStateModel>) {
    console.log("CALLED")
    return this.dataService.getDashboard().pipe(
      tap((result: any) => {
        console.log(result)
        const activityMap = result.activityData;
        console.log(activityMap)
        const newState = {
          totalUsers: result.totalUsers,
          lastUserAdded: result.lastUserAdded,
          userActivity: result.activityData
        }
        ctx.setState(newState)
      })
    )
  }
}
