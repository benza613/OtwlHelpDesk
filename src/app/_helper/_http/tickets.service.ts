import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private readonly apiBaseUrl = env.url.server;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    }
  };

  index(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/getTickets`,
      { startDate: '', endDate: '' },
      this.httpOptions)
      .pipe(map(r => r));;
  }
}
