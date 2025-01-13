import { inject, Injectable } from '@angular/core';
import { baseURL } from '../../constants';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint = `${baseURL}/api/login`;
  http = inject(HttpClient)
  login(credentials: { username: string, password: string }) {
    return this.http.post<{ token: string }>(this.endpoint, credentials).pipe(
      tap((response) => {
        console.log(response)
      })
    )
  }
}
