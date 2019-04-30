import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';
import { MessageInlineAtt } from 'src/app/models/messageInlineAtt.model';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {
  private readonly apiBaseUrl = env.url.server;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    }
  };

  index(searchParams): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/getThreads`,
      searchParams,
      this.httpOptions)
      .pipe(map(r => r));;
  }

  fetchThreadEmails(ThreadId): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/getThreadEmails`,
      { ThreadId },
      this.httpOptions)
      .pipe(map(r => r));;
  }

  fetchRefNoStatus(RefNo, RefType): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/getRefNoStatus`,
      { RefNo, RefType },
      this.httpOptions)
      .pipe(map(r => r));;
  }

  sendNewMail(To: string[], Cc: string[], Bcc: string[], Subject: string, Body: string, inlineAttachments: MessageInlineAtt[]): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/postNewMail`,
      { To, Cc, Bcc, Subject, Body, inlineAttachments },
      this.httpOptions)
      .pipe(map(r => r));;
  }

}
