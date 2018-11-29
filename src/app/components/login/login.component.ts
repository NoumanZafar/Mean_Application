import { Component, OnInit } from '@angular/core';

/**
 * Import services
 * Angular material
 * Forms
 * And Model
 */
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { User } from '../../user.model'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * Create an array of type Student to store the student data
   * Craete a form of tyoe FormGroup
   */
  users: User[];
  createForm: FormGroup;

  /**
   * Dependency Injections
   * 
   * @param userService LoginService
   * @param snakBar Angular Material
   * @param fb Form Builder
   * @param router Routing 
   * 
   * Create the from inside the constructor and provide the fileds to input ID and Password to login 
   * 
   */
  constructor(private userService: LoginService,
    private snakBar:MatSnackBar,
    private fb: FormBuilder,
    private router: Router) {
    this.createForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /** 
   * Wheneve the login page in displayed delete the Local storage
   * To delete the user login details and authenticate the application
  */
  ngOnInit() {
    localStorage.clear();
  }

  /**
   * 
   * @param user User ID
   * @param password Password to login
   * 
   * Using the services find the user from database where given Id and Password matches
   * and navigate the user to the next page and allown them to perform different tasks
   * 
   * If user is not found display the message using angular Snack bar that user does't exist 
   * and block the user to navigate unless they enter the right details.
   */
  getUserss(user: any, password: any) {
    this.userService.getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].userId == user && this.users[i].password == password) {
            localStorage.setItem('username',user);
            console.log(localStorage.getItem('admin'));
            this.router.navigate(['/list']);
            console.log('Data Requested...');
            console.log(this.users);
            this.snakBar.open(this.users[i].userId+' Loged in','OK',{
              duration:4000
            });
            break;
          }else if (!(this.users[i].userId == user && this.users[i].password == password)){
            this.snakBar.open('User Id or Password not Correct','OK',{
              duration:4000
            });
          }
        }
      });
  }
}
