import { Component, OnInit } from '@angular/core';

/**
 * Import services and routing modules
 * Import the angular materials
 */
import { StudentService } from '../../student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

/** interface of the student */
import { Student } from '../../student.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  /**
   * Create the id and student array of any type to store the students
   */
  id: String;
  student: any = {};

  /**
   * To create update form create a variable of type FormGroup
   */
  updateForm: FormGroup;
  constructor(private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
    this.createForm();
  }

  /**
   * create the form using FormGroup and form builder
   */
  createForm() {
    this.updateForm = this.fb.group({
      /**
       * Few fields requires the validation that means 
       * Student can't be updated unless these fileds has the information
       */
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
   * When the page is loaded take the information of the student and display it in the form
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.studentService.getStudentById(this.id)
        .subscribe(res => {
          this.student = res;
          this.updateForm.get('studentId').setValue(this.student.studentId);
          this.updateForm.get('name').setValue(this.student.name);
          this.updateForm.get('address').setValue(this.student.address);
          this.updateForm.get('phone').setValue(this.student.phone);
          this.updateForm.get('email').setValue(this.student.email);
          this.updateForm.get('course').setValue(this.student.course);
          this.updateForm.get('studentType').setValue(this.student.studentType);
        });
    });
  }

  /**
   * Update the information using these Parameters
   * After updating the information display the message that information has been updated
   * 
   * @param studentId 
   * @param name 
   * @param address 
   * @param phone 
   * @param email 
   * @param course 
   * @param studentType 
   */
  updateStudent(studentId, name, address, phone, email, course, studentType) {
    this.studentService.updateStudent(this.id, studentId, name, address, phone, email, course, studentType)
      .subscribe(() => {
        this.snackBar.open('Student Details Updated', 'OK', {
          duration: 4000
        });
      });
  }
}
