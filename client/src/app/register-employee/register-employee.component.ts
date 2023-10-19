import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent {
  baseUrl = 'https://localhost:5001/api/';

  form = this.fb.group({
    employeeName: ['', Validators.required],
    jobTitle: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router, private accountService: AccountService) {
  }
  register(){
    const value = {...this.form.value}
    this.accountService.register(value).subscribe({
      next: _ => {
        this.router.navigateByUrl('/employees')
      },
      error: error => console.log(error)
    })
  }
}
