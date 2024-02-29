import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventsComponent {
  form = this.fb.group({
    eventTitle:['', Validators.required],

    employeeId:['', Validators.required],

    eventDescription: ['', Validators.required],

    datePicker: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) {

  }

  addEvent() {
    console.log(JSON.stringify(this.form.value))
  }
}
