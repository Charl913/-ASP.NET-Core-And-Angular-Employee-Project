import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventsComponent {
  form = this.fb.group({
    eventTitle: ['', Validators.required],

    employeeId: ['', Validators.required],

    eventDescription: ['', Validators.required],

    datePicked: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private accountService: AccountService) {

  }

  addEvent() {
    const value = { ... this.form.value };
    this.accountService.addEvent(value).subscribe();
  }

  get datePicked() {
    return this.form.controls['datePicked'];
  }

  get eventDescription() {
    return this.form.controls['eventDescription'];
  }
}
