import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/_helper/_util/local-storage.service';
import { Buffer } from 'buffer';
import { EmailsStoreService } from 'src/app/_helper/_store/emails-store.service';
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
  //https://www.npmjs.com/package/angular-file-uploader
  //https://github.com/mileshenrichs/spotify-playlist-generator
  public EditorTools: object = {
    items: [
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
      'Image', '|', 'Print', '|', 'FullScreen']
  };

  msgToList = [
    { emailId: 'benito.alvares@gmail.com' },
    { emailId: '<benito.alvares@gmail.com>' },
    { emailId: 'pritee@oceantransworld.com' },
    { emailId: 'Sushant <it5@oceantransworld.com>' },
  ]

  _inlineAttachments = [];

  _inlineAttachB64 = [];
  public EditorValue: string = `  <span>

  <!--StartFragment--><p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(51, 51, 51); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; font-family: Roboto, &quot;Segoe UI&quot;, GeezaPro, &quot;DejaVu Serif&quot;, sans-serif, -apple-system, BlinkMacSystemFont; background-color: rgb(255, 255, 255);">Hello Sir,</p><p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(51, 51, 51); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; font-family: Roboto, &quot;Segoe UI&quot;, GeezaPro, &quot;DejaVu Serif&quot;, sans-serif, -apple-system, BlinkMacSystemFont; background-color: rgb(255, 255, 255);">&nbsp;This a testing mail</p><p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(51, 51, 51); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; font-family: Roboto, &quot;Segoe UI&quot;, GeezaPro, &quot;DejaVu Serif&quot;, sans-serif, -apple-system, BlinkMacSystemFont; background-color: rgb(255, 255, 255);">&nbsp;Kindly provide me quotations for following :</p><p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(51, 51, 51); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; font-family: Roboto, &quot;Segoe UI&quot;, GeezaPro, &quot;DejaVu Serif&quot;, sans-serif, -apple-system, BlinkMacSystemFont; background-color: rgb(255, 255, 255);"><br style="box-sizing: border-box;"></p><p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(51, 51, 51); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; font-family: Roboto, &quot;Segoe UI&quot;, GeezaPro, &quot;DejaVu Serif&quot;, sans-serif, -apple-system, BlinkMacSystemFont; background-color: rgb(255, 255, 255);"><br style="box-sizing: border-box;"></p><p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(51, 51, 51); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; font-family: Roboto, &quot;Segoe UI&quot;, GeezaPro, &quot;DejaVu Serif&quot;, sans-serif, -apple-system, BlinkMacSystemFont; background-color: rgb(255, 255, 255); text-align: right;"><br style="box-sizing: border-box;"><br style="box-sizing: border-box;"><br style="box-sizing: border-box;"><span style="box-sizing: border-box; color: rgb(142, 170, 219); text-decoration: inherit;"><strong style="box-sizing: border-box; font-weight: 700;"><span style="box-sizing: border-box; font-family: Arial, Helvetica, sans-serif;">Benito Alvares</span></strong><br style="box-sizing: border-box;"><em style="box-sizing: border-box; color: rgb(51, 51, 51);"><span style="box-sizing: border-box; color: rgb(142, 170, 219); text-decoration: inherit;">“Silver Astra” B-503/A, J. B. Nagar, Andheri (E) Mumbai- 400 099.&nbsp;<br style="box-sizing: border-box;"></span></em></span><em style="box-sizing: border-box;"><span style="box-sizing: border-box; color: rgb(142, 170, 219); text-decoration: inherit;">&nbsp;Board : +91 22 62839000-99 (100 lines)&nbsp;<br style="box-sizing: border-box;"></span></em><em style="box-sizing: border-box;"><span style="box-sizing: border-box; color: rgb(142, 170, 219); text-decoration: inherit;">&nbsp;Direct : +91 22 62839034&nbsp;<br style="box-sizing: border-box;"></span></em><em style="box-sizing: border-box;"><span style="box-sizing: border-box; color: rgb(142, 170, 219); text-decoration: inherit;">Mobile : +91 7045951608&nbsp;<br style="box-sizing: border-box;"></span></em><em style="box-sizing: border-box;"><span style="box-sizing: border-box; color: rgb(142, 170, 219); text-decoration: inherit;">Fax : +91 11 22 2830 4386&nbsp;</span></em></p><p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(51, 51, 51); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial; font-family: Roboto, &quot;Segoe UI&quot;, GeezaPro, &quot;DejaVu Serif&quot;, sans-serif, -apple-system, BlinkMacSystemFont; background-color: rgb(255, 255, 255); text-align: right;"><em style="box-sizing: border-box;"><span style="box-sizing: border-box; color: rgb(142, 170, 219); text-decoration: inherit;">E-Mail : hr@oceantransworld.com&nbsp;<br style="box-sizing: border-box;"></span></em><em style="box-sizing: border-box;"><span style="box-sizing: border-box; color: rgb(142, 170, 219); text-decoration: inherit;">&nbsp;Web :<span>&nbsp;</span><a class="e-rte-anchor" _ngcontent-c1="" href="http://localhost:4200/OtwlGmailApp/www.oceantransworld.com" title="www.oceantransworld.com" style="box-sizing: border-box; color: rgb(46, 46, 241); text-decoration: none; background-color: transparent; user-select: auto;">www.oceantransworld.com</a></span></em></p><!--EndFragment-->
  
  </span>`;

  constructor(private route: ActivatedRoute, private locStgService: LocalStorageService,
    private emailStore: EmailsStoreService) { }

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

  actionCompleted(ev: any) {
    console.log(ev);

    if (ev.requestType == "Image") {
      console.log(ev.elements);

      ev.elements.forEach(element => {
        console.log(element.nodeName);

        if (element.nodeName == "IMG") {
          console.log(element.src);
          console.log(element.alt);

          this._inlineAttachments.push({
            src: element.src,
            alt: element.alt
          });

        }
      });

    }
  }

  onClick_SendEmail() {

    let msgBodyCopy = this.EditorValue;

    var self = this;
    this._inlineAttachments.forEach((img, imgCounter) => {

      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          //(reader.result as string)
          let cid = self.randomCidGenerator(11);
          var newstr = msgBodyCopy.replace(img.src, "cid:" + cid);
          msgBodyCopy = newstr;

          self._inlineAttachB64.push({
            cid: cid,
            filename: img.alt,
            dataUrl: (reader.result as string).split(",")[1]
          });

          if (imgCounter == self._inlineAttachments.length - 1) {
            self.postBody(msgBodyCopy);
          }
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', img.src);
      xhr.responseType = 'blob';
      xhr.send();

    });

  }

  postBody(processedBody) {

console.log();

    //this.emailStore.sendEmail([], [], [], "Subject Testing", processedBody, this._inlineAttachB64);

  }

  randomCidGenerator(lengthx) {
    var text = "otwl_-_-_";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < lengthx; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
