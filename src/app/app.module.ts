import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { EmailListComponent } from './email/email-list/email-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmailViewComponent } from './email/email-view/email-view.component';
import { SafeHtmlPipe } from './_helper/_pipe/safe-html.pipe';
import { EmailMapComponent } from './email/email-map/email-map.component';

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    EmailListComponent,
    NotFoundComponent,
    EmailViewComponent,
    SafeHtmlPipe,
    EmailMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [EmailMapComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
