import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { Employee } from './_models/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser()
  }

  setCurrentUser() {
    const employeeString = localStorage.getItem('employee');
    if(!employeeString) return;
    const employee: Employee = JSON.parse(employeeString)
    this.accountService.setCurrentUser(employee);
  }
}
