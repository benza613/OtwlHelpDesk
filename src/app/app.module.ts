import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';
import { EmailListComponent } from './email/email-list/email-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmailViewComponent } from './email/email-view/email-view.component';
import { SafeHtmlPipe } from './_helper/_pipe/safe-html.pipe';
import { EmailMapComponent } from './email/email-map/email-map.component';
import { EmailEditorComponent } from './email/email-editor/email-editor.component';
import { LocalStorageService } from './_helper/_util/local-storage.service';



@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    EmailListComponent,
    NotFoundComponent,
    EmailViewComponent,
    SafeHtmlPipe,
    EmailMapComponent,
    EmailEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    RichTextEditorAllModule,
    StorageServiceModule
  ],
  providers: [LocalStorageService],
  entryComponents: [EmailMapComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
