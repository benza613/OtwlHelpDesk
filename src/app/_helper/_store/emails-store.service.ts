import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { shareReplay, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmailsStoreService {

  constructor() { }


  // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject 
  //   because it has the write rights
  // - Writing to state should be handled by specialized Store methods (ex: addTicket, removeTicket, etc)
  // - Create one BehaviorSubject per store entity, for example if you have TicketGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _tickets = new BehaviorSubject<Ticket[]>([]);


}
