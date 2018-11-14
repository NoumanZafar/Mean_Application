import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router:Router,private snakBar:MatSnackBar){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
   if(localStorage.getItem('username') != null){
     return true;
   }else{
    this.snakBar.open('User not Logged in','OK',{
      duration:3000
    });
     this.router.navigate(['/login']);
     return false;
   }
  }
}
