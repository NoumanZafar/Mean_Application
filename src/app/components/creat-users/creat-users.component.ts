import { Component, OnInit } from '@angular/core';

/**
 * Import the Forms from Angular
 * and services
 * and Router
 */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-creat-users',
  templateUrl: './creat-users.component.html',
  styleUrls: ['./creat-users.component.css']
})
export class CreatUsersComponent implements OnInit {
  createForm: FormGroup;

  /**
   * Dependency Injection
   * 
   * @param userService 
   * @param snackBar 
   * @param fb 
   * @param router 
   */
  constructor(private userService: LoginService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router) {

    /**
     * Create a new form where user details are taken and register in the system
     */
    this.createForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  /**
   * Take user id and password and register the user in teh system so they could login any time
   * @param userId 
   * @param password 
   */
  addUser(userId, password) {
    this.userService.addUsers(userId, password).subscribe(() => {
      /**
       * After regestring the user navigate to the login page.
       */
      this.router.navigate(['/login']);
      console.log('In Add User function');
      this.snackBar.open(userId + ' Registered', 'Ok', {
        duration: 3000
      });
    });
  }

}
