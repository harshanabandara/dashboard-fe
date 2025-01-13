import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseURL } from '../../constants';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient)
  private url = `${baseURL}/api/users`
  constructor() { }

  getUsers(payload: { page: number | null, limit: number | null }) {
    // Set the default value to 20. 
    let page = payload.page ?? 0
    let limit = payload.limit ?? 20
    return this.http.get(`${this.url}?page=${page}&size=${limit}`).pipe(
      tap(response => {
        console.log(response)
      })
    )
  }

  postUser(payload: { firstName: string, lastName: string }) {
    return this.http.post<{ firstName: string, lastName: string, id: number }>(this.url, payload)
  }

  putUser(payload: { id: number, user: { firstName: string, lastName: string } }) {
    return this.http.put<{ user: { firstName: string, lastName: string } }>(`${this.url}/${payload.id}`, payload.user)
  }

  deleteUser(payload: { id: number }) {
    return this.http.delete(`${this.url}/${payload.id}`)
  }

}
