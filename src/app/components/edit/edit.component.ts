import { Component, OnInit } from '@angular/core';
//import here
import { StudentService } from '../../student.service';
import {Router,ActivatedRoute} from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
//interface
import { Student } from '../../student.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id:String;
  student:any={};
  updateForm:FormGroup;
  constructor(private studentService : StudentService,
    private router:Router,
    private route:ActivatedRoute,
    private snackBar:MatSnackBar,
    private fb: FormBuilder) { 
      this.createForm();
    }

    createForm(){
      this.updateForm = this.fb.group({
        studentId: ['', Validators.required],
        name: '',
        address: '',
        phone:['', Validators.required],
        email: ['', Validators.required],
        course: '',
        studentType:''
      });
    }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id=params.id;
      this.studentService.getStudentById(this.id)
      .subscribe(res =>{
        this.student=res;
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

  updateStudent(studentId, name, address, phone, email, course,studentType) {
    this.studentService.updateStudent(this.id, studentId, name, address, phone, email, course,studentType)
    .subscribe(()=>{
      this.snackBar.open('Student Details Updated','OK',{
        duration:4000
      });
    });
  }
}
