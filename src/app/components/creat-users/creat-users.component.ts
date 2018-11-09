import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-creat-users',
  templateUrl: './creat-users.component.html',
  styleUrls: ['./creat-users.component.css']
})
export class CreatUsersComponent implements OnInit {
  createForm: FormGroup;
  
  constructor(private userService: LoginService,
    private fb: FormBuilder,
    private router: Router) {
    this.createForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  addUser(userId,password) {
    this.userService.addUsers(userId,password).subscribe(()=>{
      this.router.navigate(['/login']);
      console.log('In Add User function');
    });
  }

}
