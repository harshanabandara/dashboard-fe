import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../../auth/state/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  store = inject(Store)
  router = inject(Router)
  canActivate() {
    console.log(this.store.selectSnapshot(AuthState.getToken))
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated)
    if (!isAuthenticated) {
      this.router.navigate(['/login'])
      return false;
    }
    return true;
  }
}