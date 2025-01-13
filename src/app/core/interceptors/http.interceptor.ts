import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../../auth/state/auth.state';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  // store = inject(Store);
  const store = inject(Store)
  const token = store.selectSnapshot(AuthState.getToken);
  let modifiedReq: HttpRequest<any>;
  if (token) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(modifiedReq)
    return next(modifiedReq);
  }
  console.log(req)
  return next(req)
};
