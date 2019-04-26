import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/_helper/_util/local-storage.service';

@Component({
  selector: 'app-email-editor',
  templateUrl: './email-editor.component.html',
  styleUrls: ['./email-editor.component.scss']
})
export class EmailEditorComponent implements OnInit {

  msgPacket = {
    from: "benito.alvares@gmail.com",
    to: [],
    cc: [],
    bcc: [],
    subject: "",
  };
  //TO DO implement file upload size testing 
  //https://www.npmjs.com/package/angular-file-upload er
  public EditorTools: object = {
    items: [
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
      'Image', '|', 'Print', '|', 'FullScreen']
  };

  public EditorValue: string = "";

  constructor(private route: ActivatedRoute, private locStgService: LocalStorageService) { }

  ngOnInit() {
    var localToken = this.route.snapshot.paramMap.get('id');
    if (localToken) {
      console.log('Token Provided ' + localToken);

      const emlData = this.locStgService.fetchMessagePacket(localToken);
      console.log(emlData);

      this.initMessagePacket(emlData);


    } else {
      console.log('Token Provided Not');
    }
  }

  initMessagePacket(emlData) {
    if (emlData.to != undefined)
      this.msgPacket.to = emlData.to;

    if (emlData.subject != undefined)
      this.msgPacket.subject = emlData.subject;

    if (emlData.to != undefined)
      this.msgPacket.to = emlData.to;

  }

}
