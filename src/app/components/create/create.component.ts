import { Component, OnInit } from '@angular/core';
//import here
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private studentService: StudentService,
    private fb: FormBuilder,
    private router: Router) {
    this.createForm = this.fb.group({
      studentId: ['', Validators.required],
      name: '',
      address: '',
      phone:['', Validators.required],
      email: ['', Validators.required],
      course: '',
      studentType:''
    });
  }

  addStudent(studentId, name, address, phone, email, course,studentType) {
    this.studentService.addStudent(studentId, name, address, phone, email, course,studentType)
      .subscribe(() => {
        this.router.navigate(['/list']);
      });
  }
  ngOnInit() {
  }

}
