import { Component, OnInit } from '@angular/core';

/**
 * Import Router 
 * Services
 * and angular material
 */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../student.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  /**
   * Create a variable of type Form Group
   */
  createForm: FormGroup;

  /**
   * Dependency Injection
   * 
   * @param studentService Service
   * @param snackBar Angular material
   * @param fb Form Builder
   * @param router Routing the different pages
   */
  constructor(private studentService: StudentService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router) {

    /**
     * Create the form to take the student record
     * Validate few fields
     */
    this.createForm = this.fb.group({
      studentId: ['', Validators.required],
      name: '',
      address: '',
      phone: ['', Validators.required],
      email: ['', Validators.required],
      course: '',
      studentType: ''
    });
  }

  /**
   * Take student details and add the to the database
   * @param studentId 
   * @param name 
   * @param address 
   * @param phone 
   * @param email 
   * @param course 
   * @param studentType Either full time or Part time student
   */
  addStudent(studentId, name, address, phone, email, course, studentType) {
    this.studentService.addStudent(studentId, name, address, phone, email, course, studentType)
      .subscribe(() => {
        this.router.navigate(['/list']);

        /**
         * Display the message after adding the details into teh database using snack bar
         */
        this.snackBar.open('Student with id ' + studentId + ' added', 'Ok', {
          duration: 3000
        });
      });
  }

  ngOnInit() { }
}
