import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {
  title = 'Employees';

  baseUrl = 'https://localhost:5001/api/Users';

  employees: Member[] =[];

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get(this.baseUrl).subscribe({
      next: response => {
        const data = JSON.parse(JSON.stringify(response));
        this.employees = data;
        return this.employees;
      },
      error: error => console.log(error),
      complete: () => console.log('request has completed', this.employees)
    });
  }
}
