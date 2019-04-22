import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Thread } from 'src/app/models/thread.model';
import { EmailsService } from 'src/app/_helper/_http/emails.service';

@Component({
  selector: 'app-email-map',
  templateUrl: './email-map.component.html',
  styleUrls: ['./email-map.component.scss']
})
export class EmailMapComponent implements OnInit {

  @Input() threadData: Thread;

  refNo: string;
  tallyJobList: string[] = ["Jobs", "Enquiry"];
  refStatus: boolean = false;
  selectedRefType: any;

  constructor(public activeModal: NgbActiveModal,
    private emailServ: EmailsService) { }

  ngOnInit() {

  }

  onRefChange(event: any) {
    this.refStatus = false;
  }

  validateJobNo() {
    this.refStatus = true;


    if (this.refNo != '' && this.refNo != undefined && this.selectedRefType != null && this.selectedRefType != undefined) {
      this.emailServ.fetchRefNoStatus(this.refNo, this.selectedRefType).toPromise()
        .then((res) => {
          console.log(res);
          this.refStatus = true;

        }).catch((x) => {
          console.error(x);

        });

    }

  }

}
