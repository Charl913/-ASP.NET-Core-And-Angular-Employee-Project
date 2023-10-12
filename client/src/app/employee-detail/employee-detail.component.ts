import { Component } from '@angular/core';
import { Member } from '../_models/member';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  emp: Member = {} as Member


  constructor() {
    
  }

  ngOnInit(): void {
    this.emp = JSON.parse(localStorage.getItem('employee')!)
  }
}
