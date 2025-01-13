import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetSummary } from '../../core/store/summary/summary.actions';
import { Observable, tap } from 'rxjs';
import { SummaryState } from '../../core/store/summary/summary.state';
import { UsersGraphComponent } from "../users-graph/users-graph.component";

@Component({
  selector: 'app-dashboard',
  imports: [UsersGraphComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  private store = inject(Store);

  @Select(SummaryState.getState) summary$: Observable<any> | undefined;

  summarySignal = this.store.selectSignal(SummaryState.getState)

  ngOnInit(): void {
    this.store.dispatch(new GetSummary()).pipe(
      tap((response) => {
        console.log(response)
      })
    )
  }

  ngOnDestroy() {
  }
  formatDate(date: string): string {
    if (date.length == 0) {
      return '';
    }
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  }

}
