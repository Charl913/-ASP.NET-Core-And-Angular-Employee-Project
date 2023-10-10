import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent {
  form = this.fb.group({
    name : ['', Validators.required]
  })

  constructor(private fb: FormBuilder) {
  }
}
