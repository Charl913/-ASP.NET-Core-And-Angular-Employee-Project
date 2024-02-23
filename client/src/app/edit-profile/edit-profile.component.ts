import { Component, OnInit } from '@angular/core';
import { Employee } from '../_models/employee';
import { AccountService } from '../_services/account.service';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{
  faPenToSquare = faPenToSquare;
  currentEmployee: Employee = {} as Employee

  constructor(private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.accountService.currentEmployee$.subscribe({
      next: res => {
        if(res){
          this.currentEmployee = res;
        }
      },
      error: error => console.log(error)
    });
  }
}
