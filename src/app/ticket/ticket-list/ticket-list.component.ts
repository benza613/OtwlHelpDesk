import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { TicketsStoreService } from 'src/app/_helper/_store/tickets-store.service';
import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent implements OnInit {
  collectionSize: number;
  currentPage = 1;

  // optimization, rerenders only tickets that change instead of the entire list of tickets
  ticketTrackFn = (i, ticket) => ticket.Id;

  constructor(public ticketStore: TicketsStoreService) {
    this.ticketStore.userTodosCount$.subscribe(x => {
      this.collectionSize = x;
    })
  }

  ngOnInit() {
  }
  itemsPerPage = 5;

  items = this.ticketStore.userTodos$;


}
