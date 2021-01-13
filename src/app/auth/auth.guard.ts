import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }
  
  checkLogin(): boolean {
    var user = JSON.parse(localStorage.getItem('user'));
    if (user != null && user != undefined) {                        
      return true; 
    }
    this.router.navigateByUrl('/login');
    return false;
  }

}
