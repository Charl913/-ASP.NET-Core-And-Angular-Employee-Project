import { Component, Output } from '@angular/core';
import { Member } from '../_models/member';
import { BehaviorSubject, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  emp: Member = {} as Member


  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.emp = JSON.parse(localStorage.getItem('employee')!)
  }
}
