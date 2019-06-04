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
  public EditorValue: string = `<!DOCTYPE html><html style=\"margin: 0; padding: 0;\"><head><title>OTWL Email Templater</title></head><body style=\"font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif !important; margin: 0; padding: 0; width: 100% !important;\"><table class=\"ivan-otwl-master0\" style=\"border: thin solid black; border-collapse: collapse; font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif !important; margin: 0; padding: 0; width: 100% !important;\"><caption><h2 class=\"chart_caption chart_caption_main\" style=\"background-color: #e11d62; box-sizing: border-box; color: white; line-height: 1.4; margin: 0; text-align: center; width: 100%;\"> Caption For Meetings Data </h2><p class=\"chart_caption\" style=\"box-sizing: border-box; color: #222; font-size: 12px; line-height: 1.4; margin: 0; text-align: left; width: 100%;\"> Description About table  </p><p class=\"chart_caption\" style=\"box-sizing: border-box; color: #222; font-size: 12px; line-height: 1.4; margin: 0; text-align: left; width: 100%;\">  <u>This is the latest capability</u> </p></caption><thead><tr><th style=\"background-color: #006699; color: white; padding: 8px;\"><h4 style=\"box-sizing: border-box; line-height: 1.4; margin: 0;\">MAI_Org_ID</h4></th><th style=\"background-color: #006699; color: white; padding: 8px;\"><h4 style=\"box-sizing: border-box; line-height: 1.4; margin: 0;\">MAI_Subject</h4></th><th style=\"background-color: #006699; color: white; padding: 8px;\"><h4 style=\"box-sizing: border-box; line-height: 1.4; margin: 0;\">MAI_Agenda</h4></th><th style=\"background-color: #006699; color: white; padding: 8px;\"><h4 style=\"box-sizing: border-box; line-height: 1.4; margin: 0;\">MAC_Reason</h4></th><th style=\"background-color: #006699; color: white; padding: 8px;\"><h4 style=\"box-sizing: border-box; line-height: 1.4; margin: 0;\">MAC_Assigned</h4></th></tr></thead><tbody><tr><td rowspan=\"2\" style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">Shamal</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">3</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">32</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">15</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">70</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">73</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">132</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">15</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">104</td></tr><tr><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">Rajesh</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">23</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">26</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">8</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">120</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">Pramila</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">23</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">32</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">45</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">103</td></tr><tr><td rowspan=\"3\" style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">Anitha</td><td rowspan=\"2\" style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">33</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">87</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">85</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">152</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">32</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">35</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">10</td></tr><tr><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">13</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">32</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">19</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">10</td></tr></tbody></table><br>\n<br>\n<br><h2 class=\"chart_caption chart_caption_main\" style=\"background-color: #e11d62; box-sizing: border-box; color: white; line-height: 1.4; margin: 0; text-align: center; width: 100%;\"> Chart Caption For Employee </h2><br><p class=\"chart_caption\" style=\"box-sizing: border-box; color: #222; font-size: 12px; line-height: 1.4; margin: 0; text-align: left; width: 100%;\"> This is a text description of the table <br> <u>A sales report, or sales analysis report</u>, gives an overview of the state of the sales activities within a company. It shows the different trends happening in the sales volume over a certain time, but also analyzes the different steps of the sales funnel and the performance of sales executives </p><p class=\"chart_caption\" style=\"box-sizing: border-box; color: #222; font-size: 12px; line-height: 1.4; margin: 0; text-align: left; width: 100%;\"> <i> This is the latest capability</i> </p><div class=\"chartgen_parent\" style=\"box-sizing: border-box; color: #222; font-size: 12px; height: 100% !important; line-height: 1.4; margin: 0; vertical-align: middle !important;\"><div class=\"chartgen_inner\" style=\"box-sizing: border-box; color: #222; font-size: 12px; line-height: 1.4; margin: 10px auto !important; max-height: 100% !important; text-align: center !important; width: 100% !important;\"><img src=\"cid:AooJhW6\" style=\"vertical-align: sub;\"></div></div><table class=\"ivan-otwl-master0\" style=\"border: thin solid black; border-collapse: collapse; font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif !important; margin: 0; padding: 0; width: 100% !important;\"><thead><tr><th style=\"background-color: #006699; color: white; padding: 8px;\"><h4 style=\"box-sizing: border-box; line-height: 1.4; margin: 0;\">MAI_Org_ID</h4></th><th style=\"background-color: #006699; color: white; padding: 8px;\"><h4 style=\"box-sizing: border-box; line-height: 1.4; margin: 0;\">Exports</h4></th><th style=\"background-color: #006699; color: white; padding: 8px;\"><h4 style=\"box-sizing: border-box; line-height: 1.4; margin: 0;\">Imports</h4></th><th style=\"background-color: #006699; color: white; padding: 8px;\"><h4 style=\"box-sizing: border-box; line-height: 1.4; margin: 0;\">SOP</h4></th><th style=\"background-color: #006699; color: white; padding: 8px;\"><h4 style=\"box-sizing: border-box; line-height: 1.4; margin: 0;\">Containers</h4></th></tr></thead><tbody><tr><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">Shamal</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">3</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">32</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">15</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">70</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">Shamal</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">73</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">132</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">15</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">104</td></tr><tr><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">Rajesh</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">23</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">26</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">8</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">120</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">Pramila</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">23</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">32</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">45</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">103</td></tr><tr><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">Anitha</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">13</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">87</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">85</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">152</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">Pritee</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">33</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">32</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">35</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">10</td></tr><tr><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">Nivedita</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">43</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">32</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">19</td><td style=\"border: thin solid black; margin: 0 auto; padding: 8px;\">10</td></tr></tbody></table><br>\n<br><table class=\"elemTesting2\" style=\"border: thin solid black; border-collapse: collapse; font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif !important; margin: 0; padding: 0; width: 100% !important;\"><caption><h2 class=\"chart_caption chart_caption_main\" style=\"background-color: #e11d62; box-sizing: border-box; color: white; line-height: 1.4; margin: 0; text-align: center; width: 100%;\"> Caption For Meetings Data </h2><br></caption><thead><tr><th style=\"background-color: #006699; color: white; padding: 8px;\"><h4 style=\"box-sizing: border-box; line-height: 1.4; margin: 0;\">Reference_ID</h4></th><th style=\"background-color: #006699; color: white; padding: 8px;\"><h4 style=\"box-sizing: border-box; line-height: 1.4; margin: 0;\">Reminder</h4></th></tr></thead><tbody><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">2</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Last hits</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">205</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Dispersion</td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">2</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Stifling Dagger</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">2</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Global Silence</td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">2</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Shackles </td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">3016</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Testing Reminders Today Recall action </td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">1234</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Wukongs Command</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\"><b style=\"box-sizing: border-box; color: #222; font-size: 12px; line-height: 1.4; margin: 0;\">##sadasd</b></td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">3017</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Krishna Reminder Followup</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">THis is <b style=\"box-sizing: border-box; color: #222; font-size: 12px; line-height: 1.4; margin: 0;\"> testing </b> <br> n g 1 reminder.THis is <b style=\"box-sizing: border-box; color: #222; font-size: 12px; line-height: 1.4; margin: 0;\">testing</b> 1 reminder. /n THis is testing 1 reminder.2THis is testing 1 reminder.3</td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">2073</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Babu 2011 Test</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">2</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">news today</td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">2</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">WERTYY 2</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">69</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">ninja 123</td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4075</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">reminder tester agenda </td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4076</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\"> </td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4077</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Yo</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4078</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">qwe</td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">3654</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">The Culling blade 3</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">3014</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Recall test  2</td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">KR tinder </td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4079</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\"> </td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4080</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\"> </td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4081</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\"> </td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4082</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\"> </td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4083</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\"> </td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4084</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\"> </td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4085</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">test daily rem </td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4086</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">aaa</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4087</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\"> </td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4088</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\"> </td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\">4089</td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\"> </td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">testing userempid</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Babu 2011 Test</td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Krishna Reminder Followup</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">testing userempid</td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Recall test  23</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Krishna Reminder Followup 2345</td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Testing Reminders Today Recall action </td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Testing Jakiro Ult interaction with aghanims scepter</td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">unsync_ Naga Siren ult up in 20 seconds</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">unsync_ Ti 8 winners will be Virtus pro</td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">unsync_ Wk bows to no one 22</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Insert test for new alert feature</td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">aasd</td></tr><tr style=\"background-color: #f2f2f2;\"><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">Testing Honey</td></tr><tr><td style=\"background: red; border: thin solid black; margin: 0 auto; padding: 8px;\"> </td><td style=\"background: red; border: thin solid black; color: yellow; margin: 0 auto; padding: 8px;\">where is my ult</td></tr></tbody></table><br>\n<br>\n<p style=\"background-color: lightpink; box-sizing: border-box; color: #222; font-size: 12px; line-height: 1.4; margin: 0;\">This is some text.</p><div style=\"background-color: lightblue; box-sizing: border-box; color: #222; font-size: 12px; line-height: 1.4; margin: 0;\"><h3 style=\"box-sizing: border-box; line-height: 1.4; margin: 0;\">This is a heading in a div element</h3><p style=\"box-sizing: border-box; color: #222; font-size: 12px; line-height: 1.4; margin: 0;\">This is some text in a div element.</p></div><p style=\"background-color: green; box-sizing: border-box; color: #222; font-size: 12px; font-style: italic; line-height: 1.4; margin: 0;\">This is some text.</p><br>\n<br><p style=\"box-sizing: border-box; color: #222; font-size: 12px; line-height: 1.4; margin: 0;\"> </p></body></html>`;

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

    if (this._inlineAttachments.length == 0) {
      self.postBody(msgBodyCopy);
    }
  }

  postBody(processedBody) {

    console.log();

    this.emailStore.sendEmail([], [], [], "Subject Testing", processedBody, this._inlineAttachB64);

  }

  randomCidGenerator(lengthx) {
    var text = "otwl_-_-_";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < lengthx; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
