import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailsService } from 'src/app/_helper/_http/emails.service';
import { EmailsStoreService } from 'src/app/_helper/_store/emails-store.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailMapComponent } from '../email-map/email-map.component';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailListComponent implements OnInit {

  searchForm: FormGroup;
  searchForm_submitted;

  t_CollectionSize: number;
  t_currentPage = 1;
  t_itemsPerPage = 10;

  // optimization, rerenders only threads that change instead of the entire list of threads
  threadTrackFn = (i, thread) => thread.ThreadId;

  constructor(private formBuilder: FormBuilder,
    public emailStore: EmailsStoreService,
    private modalService: NgbModal) {
    this.emailStore.threadsCount$.subscribe(x => {
      this.t_CollectionSize = x;
      console.log(x);
    })
  }

  ngOnInit() {
    this.initSearchForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.searchForm.controls; }


  threadList = this.emailStore.threads$;


  initSearchForm() {

    this.searchForm = this.formBuilder.group({
      addrFrom: ['hello@freshdesk.com'],
      addrTo: [''],
      subject: ['Invitation: Customer First Summit by Freshworks'],
    });
  }

  onSearchSubmit() {
    this.searchForm_submitted = true;

    // stop here if form is invalid
    if (this.searchForm.invalid) {
      console.log('inv', this.searchForm.invalid);

      return;
    }

    //ES6 spread operator
    const copy_SForm = { ...this.searchForm.value }
    console.log(copy_SForm);

    // this.emailServ.index(copy_SForm).toPromise().then(r => {
    //   console.log(r);
    // });

    this.emailStore.updateThreadList(copy_SForm);
  }


  onClick_GetThreadMessages(threadData) {
    console.log(threadData.ThreadId);
    this.emailStore.updateThreadEmails(threadData.ThreadId);
  }

  onClick_MapThread(threadData) {
    const modalRef = this.modalService.open(EmailMapComponent, { size: "lg" });
    modalRef.componentInstance.threadData = threadData; // should be the id

    modalRef.result.then((result) => {
      console.log(result);

      if (result.action == "submit" && result.data.length > 0) {

      }
    }).catch((error) => {
      console.log('dismiss');
    });
  }
}
