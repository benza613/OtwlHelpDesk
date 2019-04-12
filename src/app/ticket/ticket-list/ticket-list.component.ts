import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  page = 1;
  pageSize = 5;

  items= [
    'aa',
    'ab',
    'av',
    'aqa',
    'aaa',
    'aqaaxzaa',
    'caaa',
    'acaa',
    'acasaa',
    'aqsaa',
    'axca',
     'aa',
    'aasdb',
    'av',
    'aqa',
    'aaa',
    'aqaaxzaa',
    'caaa',
    'aacaa',
    'acasaa',
    'aqsaa',
    'axca',
     'aa',
    'ab',
    'av',
    'aqa',
    'aaa',
    'aqaaxzaa',
    'caaa',
    'acaa',
    'acasaa',
    'aqsaa',
    'axca',
  ];

}
