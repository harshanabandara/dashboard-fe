import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseURL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient)
  private url = `${baseURL}/users`
  constructor() { }

  getUsers(page: number, limit: number) {
    return this.http.get(`${this.url}?page=${page}&size=${limit}`)
  }

  addUser(payload: { firstName: string, lastName: string }) {
    return this.http.post<{ firstName: string, lastName: string, id: number }>(this.url, payload)
  }

}
