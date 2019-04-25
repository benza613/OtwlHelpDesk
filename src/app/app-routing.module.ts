import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';
import { EmailListComponent } from './email/email-list/email-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmailViewComponent } from './email/email-view/email-view.component';
import { EmailEditorComponent } from './email/email-editor/email-editor.component';

const routes: Routes = [
  {
    path: '',
    component: EmailListComponent,
    pathMatch: 'full'
  },
  {
    path: 'view/:id',
    component: EmailViewComponent,
    pathMatch: 'full'
  },
  {
    path: 'preview',
    component: EmailEditorComponent,
    pathMatch: 'full'
  },
  {
    path: 'preview/:id',
    component: EmailEditorComponent,
    pathMatch: 'full'
  },
  {
    path: 'threads',
    component: TicketListComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
