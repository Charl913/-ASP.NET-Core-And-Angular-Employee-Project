import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    name : ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) {
  }
}
