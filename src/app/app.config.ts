import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngxs/store';
import { AuthState } from './auth/state/auth.state';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { UsersState } from './core/store/users/users.state';
import { SummaryState } from './core/store/summary/summary.state';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'

export const appConfig: ApplicationConfig = {
  providers: [
    provideCharts(withDefaultRegisterables()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideStore([AuthState, UsersState, SummaryState], withNgxsStoragePlugin({ keys: ['auth.token', 'auth.isAuthenticated'] }))
  ]
};
