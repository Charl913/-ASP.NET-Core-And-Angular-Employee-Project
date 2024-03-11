import { Component, OnInit, TemplateRef } from '@angular/core';
import { Employee } from '../_models/employee';
import { AccountService } from '../_services/account.service';
import { faPenToSquare, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faSquarePlus = faSquarePlus;
  currentEmployee: Employee = {} as Employee;
  modalRef?: BsModalRef;

  education = this.fb.group({
    school: ['', Validators.required],
    degree: ['', Validators.required]
  });

  experience = this.fb.group({
    title: ['', Validators.required],
    companyName: ['', Validators.required]
  });

  constructor(private accountService: AccountService,
    private modalService: BsModalService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.accountService.currentEmployee$.subscribe({
      next: res => {
        if (res) {
          this.currentEmployee = res;
        }
      },
      error: error => console.log(error)
    });
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  saveEducation() {
    const values = { ...this.education.value };
    this.education.controls['school'].setValue('');
    this.education.controls['degree'].setValue('');
    this.modalService.hide();
  }

  saveExperience() {
    const values = { ...this.experience.value };
    this.experience.controls['title'].setValue('');
    this.experience.controls['companyName'].setValue('');
    this.modalService.hide();
  }
}
