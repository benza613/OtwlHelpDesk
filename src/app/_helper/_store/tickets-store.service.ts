import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { shareReplay, map } from 'rxjs/operators'
import { Ticket } from "../../models/ticket.model";
import { TicketsService } from "../_http/tickets.service";

@Injectable({
  providedIn: 'root'
})
export class TicketsStoreService {

  constructor(private ticketServ: TicketsService) {
    this.fetchAll();
  }

  // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject 
  //   because it has the write rights
  /*
    */
  // - Writing to state should be handled by specialized Store methods (ex: addTicket, removeTicket, etc)
  // - Create one BehaviorSubject per store entity, for example if you have TicketGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _tickets = new BehaviorSubject<Ticket[]>([]);

  // Expose the observable$ part of the _tickets subject (read only stream)
  readonly tickets$ = this._tickets.asObservable();

  // we'll compose the tickets$ observable with map operator to create a stream of only completed tickets
  readonly userTodos$ = this.tickets$.pipe(
    map(todos => this.tickets)
  )

  readonly userTodosCount$ = this.tickets$.pipe(
    map(todoLength => this.tickets.length)
  )

  // the getter will return the last value emitted in _tickets subject
  get tickets(): Ticket[] {
    return this._tickets.getValue();
  }

  // assigning a value to this.tickets will push it onto the observable 
  // and down to all of its subsribers (ex: this.tickets = [])
  set tickets(val: Ticket[]) {
    this._tickets.next(val);
  }

  async fetchAll() {
    var res = await this.ticketServ.index().toPromise();
    console.log('ticketStore Fetchall', res);

    if (res.d.errId == "200")
      this.tickets = <Ticket[]>res.d.tickets;
  }
}
