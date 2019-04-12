import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';

const routes: Routes = [
  {
    path: '',
    component: TicketListComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/CD.aspx' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
