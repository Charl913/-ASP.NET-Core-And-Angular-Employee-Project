import { Component, OnInit, TemplateRef } from '@angular/core';
import { Employee } from '../_models/employee';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faTrash, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../_services/account.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {
  faTrash = faTrash;
  faUserTie = faUserTie;
  modalRef?: BsModalRef;
  title = 'Employees';
  baseUrl = 'https://localhost:5001/api/Employees';
  employees: Employee[] = [];
  currentEmployee: Employee = {} as Employee;

  constructor(private http: HttpClient,
    private router: Router,
    private accountService: AccountService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.http.get(this.baseUrl).subscribe({
      next: response => {
        const data = JSON.parse(JSON.stringify(response));
        this.employees = data;
        return this.employees;
      },
      error: error => console.log(error)
    });

    this.accountService.currentEmployee$.subscribe({
      next: res => {
        if (res) {
          this.currentEmployee = res;
        }
      }
    });
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  setDetails(id: number) {
    this.router.navigate(['employees/detail'], { queryParams: { data: id } });
  }

  setProjects(id: number) {
    this.router.navigate(['employees/projects'], { queryParams: { data: id } });
  }

  deleteEmployee(id: number) {
    this.http.delete<Employee>('https://localhost:5001/api/admin/delete-employee/' + id).subscribe();
    this.modalRef?.hide();
  }

  addAdmin(id: number) {
    this.http.put<Employee>('https://localhost:5001/api/admin/make-admin/' + id, id).subscribe();
    this.modalRef?.hide();
  }
}
