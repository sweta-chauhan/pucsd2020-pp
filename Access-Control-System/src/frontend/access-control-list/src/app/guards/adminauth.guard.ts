import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router'; 
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AdminauthGuard implements CanActivate {
  constructor(
    private router: Router
  
  ) {}

  canActivate(
  ):boolean {
    const isLoggedIn = localStorage.getItem('id');
    const isAdmin = localStorage.getItem('isAdmin');
    if(isLoggedIn && isAdmin === '1' ) {
      return true;
    } 
    else {
      return false;
      this.router.navigate(['/main']);
      }
    }
  
}
