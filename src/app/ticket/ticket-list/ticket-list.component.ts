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

  // optimization, rerenders only tickets that change instead of the entire list of tickets
  ticketTrackFn = (i, ticket) => ticket.Id;

  constructor(public ticketStore: TicketsStoreService) { }

  ngOnInit() {
  }

  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;

  items = this.ticketStore.userTodos$;

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }


  //collectionSize = this.ticketStore.userTodosCount$;

}
