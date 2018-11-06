import { Component, OnInit } from '@angular/core';

//import here
import { StudentService } from '../../student.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Student } from '../../student.model'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  //do stuff
  students: Student[];
  displayedColumns = ['studentId', 'name', 'address', 'phone', 'email', 'course', 'studentType', 'actions'];
  constructor(private studentService: StudentService,
    private router: Router) { }

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.studentService
      .getStudents()
      .subscribe((data: Student[]) => {
        this.students = data;
        console.log('Student Data Requested....');
        console.log(this.students);
      });
  }

  editStudent(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteStudent(id) {
    this.studentService
      .deleteStudent(id)
      .subscribe(() => {
        this.fetchStudents();
      });
  }

}
