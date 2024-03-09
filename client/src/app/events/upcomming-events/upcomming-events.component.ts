import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Employee } from 'src/app/_models/employee';
import { Event } from 'src/app/_models/event';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-upcomming-events',
  templateUrl: './upcomming-events.component.html',
  styleUrls: ['./upcomming-events.component.css']
})
export class UpcommingEventsComponent implements OnInit {
  events: Event[] = [];
  faChevronDown = faChevronDown;
  currentUser: Employee = {} as Employee;
  modalRef?: BsModalRef;

  constructor(private http: HttpClient,
    private accountService: AccountService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.accountService.currentEmployee$.subscribe({
      next: res => {
        if (res) {
          this.currentUser = res;
        }
      }
    })

    this.http.get('https://localhost:5001/api/employeeevent').subscribe({
      next: res => {
        const data = JSON.parse(JSON.stringify(res));
        this.events = data;
        return data;
      },
      error: err => console.log(err)
    });
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
