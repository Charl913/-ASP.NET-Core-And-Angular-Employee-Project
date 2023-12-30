import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router) {}

  canActivate(): Observable<boolean>{
    return this.accountService.currentEmployee$.pipe(
      map(user => {
        if(user) return true;
        else{
          this.toastr.error('You are not authorized!', 'Error', {positionClass: 'toast-bottom-left'});
          this.router.navigateByUrl('');
          return false
        }
      })
    )
  }
  
}
