import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseURL } from '../../constants';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  http = inject(HttpClient);
  private url = `${baseURL}/api/dashboard`
  constructor() { }

  getDashboard() {
    return this.http.get(this.url).pipe(
      tap((response) => {
        console.log(response)
      })
    )
  }

}
