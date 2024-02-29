import { Component } from '@angular/core';
import { Employee } from '../_models/employee';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  currentEmployee: Employee = {} as Employee

  constructor(private accountService: AccountService) {
    this.accountService.currentEmployee$.subscribe({
      next: res => {
        if(res){
          this.currentEmployee = res
        }
      }
    })
  }
}
