import { Component, OnInit } from '@angular/core';
import { EmailsStoreService } from 'src/app/_helper/_store/emails-store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.scss']
})
export class EmailViewComponent implements OnInit {

  reqThreadId;
  emailList;

  constructor(private route: ActivatedRoute,
    public emailStore: EmailsStoreService) { }

  ngOnInit() {
    this.reqThreadId = this.route.snapshot.paramMap.get('id');
    this.renderMessages(this.reqThreadId);
  }

  renderMessages(ThreadId) {
    this.emailList = this.emailStore.getMsgList$(ThreadId);
  }
}
