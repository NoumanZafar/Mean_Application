import { Component, OnInit } from '@angular/core';
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
  users: User[];
  createForm: FormGroup;

  constructor(private userService: LoginService,
    private snakBar:MatSnackBar,
    private fb: FormBuilder,
    private router: Router) {
    this.createForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    localStorage.clear();
  }

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
