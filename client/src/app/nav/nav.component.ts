import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Employee } from '../_models/employee';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentEmployee: Employee = {} as Employee;
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.currentEmployee$.subscribe({
      next: res => {
        if (res) {
          this.currentEmployee = res
        }
      }
    });
  }

  logOut() {
    this.accountService.logout()
  }
}
