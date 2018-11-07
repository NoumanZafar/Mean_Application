import { Component, OnInit, ViewChild } from '@angular/core';

//import here
import { StudentService } from '../../student.service';
import { Router } from '@angular/router';
import { Student } from '../../student.model'
import { MatTableDataSource, MatPaginatorModule } from '@angular/material';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  //do stuff
  students: Student[];
  displayedColumns = ['studentId', 'name', 'address', 'phone', 'email', 'course', 'studentType', 'actions'];

  dataSource: any;
  @ViewChild(MatPaginatorModule) paginatorModule: MatPaginatorModule;

  constructor(private studentService: StudentService,
    private router: Router) { }

  ngOnInit() {
    this.getStudentData();
  }

  getStudentData() {
    this.studentService.getStudents().subscribe(
      (data: Student[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginatorModule = this.paginatorModule;
      },
      (error) => {
        console.log("Error " + error)
      }
    );
  }

  applyFilter(value: String) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginatorModule) {
      this.dataSource.paginatorModule.firstPage();
    }
  }

  /*
  fetchStudents() {
    this.studentService
      .getStudents()
      .subscribe((data: Student[]) => {
        this.students = data;
        console.log('Student Data Requested....');
        console.log(this.students);
      });
  }
*/
  editStudent(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteStudent(id) {
    this.studentService
      .deleteStudent(id)
      .subscribe(() => {
        this.getStudentData();
      });
  }

  onRowClicked(row) {
    //somthing else needs to be done here
    //for the momment just print out in console
    console.log('Row Clicked :', row);
  }

}
