import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {

  searchForm: FormGroup;
  searchForm_submitted;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initSearchForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.searchForm.controls; }

  initSearchForm() {

    this.searchForm = this.formBuilder.group({
      addrFrom: [''],
      addrTo: [''],
      subject: [''],
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

    

  }
}
