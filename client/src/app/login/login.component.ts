import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    employeeName : ['john', Validators.required],
    password: ['Password1', Validators.required]
  })

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
  }

  login() {
    const values = {...this.form.value}
    this.accountService.login(values).subscribe({
      next: _ => {
        this.router.navigateByUrl('/employees')
      },
      error: error => console.log(error)
    })
  }
}
