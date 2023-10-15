import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  isLoggedIn = true

  ngOnInit(): void {
  }

  logOut() {
    this.isLoggedIn = false;
    return this.isLoggedIn
  }

  logIn() {
    this.isLoggedIn = true;
    return this.isLoggedIn    
  }
}
