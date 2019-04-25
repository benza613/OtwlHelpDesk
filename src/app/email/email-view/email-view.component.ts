import { Component, OnInit } from '@angular/core';
import { EmailsStoreService } from 'src/app/_helper/_store/emails-store.service';
import { ActivatedRoute } from '@angular/router';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService]
})
export class EmailViewComponent implements OnInit {

  ///DO NOT DELETE THIS COMMENT 
  ///https://github.com/SyncfusionExamples/ej2-angular-7-rich-text-editor
  ///https://www.syncfusion.com/kb/9864/how-to-get-started-easily-with-syncfusion-angular-7-rich-text-editor


  reqThreadId;
  emailList;

  public EditorTools: object = {
    items: [
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };

  public EditorValue: string = "  <p>The RichTextEditor triggers events based on its actions. </p>    <p> The events can be used as an extension point to perform custom operations.</p> " + `


  <table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
</table>

<div><br></div>
</span><br></div><div><br></div><div style="text-align: right;"><span style="font-family: Arial, Helvetica, sans-serif;"><span style="color: rgb(47, 84, 150); text-decoration: inherit;"><strong><em>Shraddha Redkar&nbsp;</em></strong></span></span><br></div><div style="text-align: right;"><span style="font-family: Arial, Helvetica, sans-serif;"><span style="color: rgb(47, 84, 150); text-decoration: inherit;"><strong><em>Executive-HR&nbsp;</em></strong></span></span><div style="text-align: right;"><br></div><div style="text-align: right;"><span style="color: rgb(47, 84, 150); text-decoration: inherit;"><span style="font-family: Arial, Helvetica, sans-serif;">“Silver Astra” B-503/A, J. B. Nagar,&nbsp;</span></span></div><div style="text-align: right;"><span style="color: rgb(47, 84, 150); text-decoration: inherit;"><span style="font-family: Arial, Helvetica, sans-serif;">Andheri (E) Mumbai- 400 099.&nbsp;</span></span></div><div style="text-align: right;"><span style="color: rgb(47, 84, 150); text-decoration: inherit;"><span style="font-family: Arial, Helvetica, sans-serif;">Board : +91 22 62839000-99 (100 lines)&nbsp;</span></span></div><div style="text-align: right;"><span style="color: rgb(47, 84, 150); text-decoration: inherit;"><span style="font-family: Arial, Helvetica, sans-serif;">Direct : +91 22 62839034&nbsp;</span></span></div><div style="text-align: right;"><span style="color: rgb(47, 84, 150); text-decoration: inherit;"><span style="font-family: Arial, Helvetica, sans-serif;">Mobile : +91 7045951608&nbsp;</span></span></div><div style="text-align: right;"><span style="color: rgb(47, 84, 150); text-decoration: inherit;"><span style="font-family: Arial, Helvetica, sans-serif;">Fax : +91 11 22 2830 4386&nbsp;</span></span></div><div style="text-align: right;"><span style="color: rgb(47, 84, 150); text-decoration: inherit;"><span style="font-family: Arial, Helvetica, sans-serif;">E-Mail : hr@oceantransworld.com&nbsp;</span></span></div><div style="text-align: right;"><span style="color: rgb(47, 84, 150); text-decoration: inherit;"><span style="font-family: Arial, Helvetica, sans-serif;">Web : www.oceantransworld.com</span></span></div></div>`


  constructor(private route: ActivatedRoute,
    public emailStore: EmailsStoreService) { }

  ngOnInit() {
    this.reqThreadId = this.route.snapshot.paramMap.get('id');
    this.renderMessages(this.reqThreadId);
  }

  renderMessages(ThreadId) {
    this.emailList = this.emailStore.getMsgList$(ThreadId);
  }

  actionCompleted(event: any) {
    console.log(event);
  }
}
