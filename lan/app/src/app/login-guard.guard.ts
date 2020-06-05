import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // exists if logged in
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
    return false;
  }

}
