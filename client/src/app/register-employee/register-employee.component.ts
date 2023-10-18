import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Employee } from '../_models/employee';
import { Router } from '@angular/router';
import { Food } from '../_models/food';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent {
  baseUrl = 'https://localhost:5001/api/';

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  form = this.fb.group({
    employeeName: ['', Validators.required],
    jobTitle: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
  }
  register(value: any){
    return this.http.post(this.baseUrl + 'account/register',value).subscribe({
      next: () => {
        this.router.navigateByUrl('/employees')
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
