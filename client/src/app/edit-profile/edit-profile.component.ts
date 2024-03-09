import { Component, OnInit, TemplateRef } from '@angular/core';
import { Employee } from '../_models/employee';
import { AccountService } from '../_services/account.service';
import { faPenToSquare, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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

  constructor(private accountService: AccountService,
    private modalService: BsModalService) { }

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
    this.modalService.hide();
  }

  saveExperience() {
    this.modalService.hide();
  }
}
