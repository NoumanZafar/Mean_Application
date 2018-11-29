import { Injectable } from '@angular/core';

/**
 * Import canActivate to use the Guards
 */
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  /**
   * 
   * @param router To route between differnet pages
   * @param snakBar to display the message
   */
  constructor(private router: Router, private snakBar: MatSnackBar) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    /**
     * If username is in the local storage of the browser
     * allow user to navigate between pages
     * and use the application
     * 
     * Otherwise block the user and navigate them to the login page
     */
    if (localStorage.getItem('username') != null) {
      return true;
    } else {
      this.snakBar.open('User not Logged in', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/login']);
      return false;
    }
  }
}
