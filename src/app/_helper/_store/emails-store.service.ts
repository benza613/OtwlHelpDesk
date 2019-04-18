import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { shareReplay, map } from 'rxjs/operators'
import { EmailsService } from '../_http/emails.service';
import { Thread } from 'src/app/models/thread.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmailsStoreService {

  constructor(private emailServ: EmailsService,
    private router: Router) { }


  // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject 
  //   because it has the write rights
  // - Writing to state should be handled by specialized Store methods (ex: addTicket, removeTicket, etc)
  // - Create one BehaviorSubject per store entity, for example if you have TicketGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _threads = new BehaviorSubject<Thread[]>([]);

  // Expose the observable$ part of the _tickets subject (read only stream)
  readonly threads$ = this._threads.asObservable();


  readonly threadsCount$ = this.threads$.pipe(
    map(th => this.threads.length)
  )

  readonly getMsgList$ = (ThreadId) => this.threads$.pipe(
    map(tx => this.threads.find(t => t.ThreadId == ThreadId).Messages)
  )

  // the getter will return the last value emitted in _tickets subject
  private get threads(): Thread[] {
    return this._threads.getValue();
  }

  // assigning a value to this.tickets will push it onto the observable 
  // and down to all of its subsribers (ex: this.tickets = [])
  private set threads(val: Thread[]) {
    this._threads.next(val);
  }

  async updateThreadList(searchParams) {
    var res = await this.emailServ.index(searchParams).toPromise();
    console.log('emailstore Fetchall', res);

    if (res.d.errId == "200")
      this.threads = <Thread[]>res.d.threads;
  }


  async updateThreadEmails(ThreadId) {
    var res = await this.emailServ.fetchThreadEmails(ThreadId).toPromise();
    console.log(res);

    if (res.d.errId == "200") {

      const index = this.threads.indexOf(this.threads.find(t => t.ThreadId === ThreadId));
      console.log(index)
      for (let ix = 0; ix < res.d.msgList.length; ix++) {
        this.threads[index].Messages.push(res.d.msgList[ix]);
      }

      this.threads = [...this.threads];

      this.router.navigate(['view/' + ThreadId]);
    }
  }

  // async getMsgList(ThreadId) {
  //   return this.threads$.pipe(
  //     map(tx => this.threads.filter(t => t.ThreadId == ThreadId))
  //   )

  // }


}
