import { Component, OnInit, TemplateRef } from '@angular/core';
import { Employee } from '../_models/employee';
import { AccountService } from '../_services/account.service';
import { faPenToSquare, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Education, Experience } from '../_models/edit-user-profile';
import { HttpClient } from '@angular/common/http';
import { URLS } from '../environments/urls.environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faSquarePlus = faSquarePlus;
  faTrash = faTrash;
  currentEmployee: Employee = {} as Employee;
  modalRef?: BsModalRef;
  currentUserExperience: Experience[] = [];
  currentUserEducation: Education[] = [];

  education = this.fb.group({
    employeeId: ['', Validators.required],
    school: ['', Validators.required],
    degree: ['', Validators.required]
  });

  experience = this.fb.group({
    employeeId: ['', Validators.required],
    title: ['', Validators.required],
    companyName: ['', Validators.required]
  });

  constructor(private accountService: AccountService,
    private http: HttpClient,
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

    this.http.get<Experience>(URLS.experienceURL + this.currentEmployee.id).subscribe({
      next: res => {
        const data = JSON.parse(JSON.stringify(res));
        this.currentUserExperience = data;
      }
    });

    this.http.get<Education>(URLS.educationURL + this.currentEmployee.id).subscribe({
      next: res => {
        const data = JSON.parse(JSON.stringify(res));
        this.currentUserEducation = data;
      }
    });
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  saveEducation() {
    this.education.controls['employeeId'].setValue(this.currentEmployee.id.toString());
    const values = { ...this.education.value };

    this.accountService.saveEducation(values).subscribe();

    this.education.controls['school'].setValue('');
    this.education.controls['degree'].setValue('');
    this.modalService.hide();
  }

  saveExperience() {
    this.experience.controls['employeeId'].setValue(this.currentEmployee.id.toString());
    const values = { ...this.experience.value };

    this.accountService.saveExperience(values).subscribe();

    this.experience.controls['title'].setValue('');
    this.experience.controls['companyName'].setValue('');
    this.modalService.hide();
  }

  removeEducation(id: number) {
    this.http.delete<Education>(URLS.accountURL + 'remove-education/' + id).subscribe();
  }

  removeExperience(id: number) {
    this.http.delete<Experience>(URLS.accountURL + 'remove-experience/' + id).subscribe();
  }
}
