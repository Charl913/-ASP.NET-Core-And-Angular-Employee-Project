import { Component, OnInit } from '@angular/core';
import { Employee } from '../_models/employee';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  currentEmployee: Employee = {} as Employee

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.currentEmployee$.subscribe({
      next: res => {
        if (res) {
          this.currentEmployee = res
        }
      }
    })
  }
}
