import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventsComponent {
  modalRef?: BsModalRef;

  form = this.fb.group({
    eventTitle: ['', Validators.required],

    employeeId: ['', Validators.required],

    eventDescription: ['', Validators.required],

    datePicked: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private modalService: BsModalService) {

  }

  addEvent(template: TemplateRef<void>) {
    const value = { ... this.form.value };
    this.accountService.addEvent(value).subscribe({
      next: _ => {
        if (this.form.valid) {
          this.modalRef = this.modalService.show(template);
        }
      },
      error: _ => {
        this.modalService.hide();
      }
    });
  }

  get datePicked() {
    return this.form.controls['datePicked'].value;
  }

  get eventTitle() {
    return this.form.controls['eventTitle'].value;
  }

  get eventDescription() {
    return this.form.controls['eventDescription'].value;
  }
}
