import { Component, OnInit, ViewChild } from '@angular/core';

//import here
import { StudentService } from '../../student.service';
import { Router } from '@angular/router';
import { Student } from '../../student.model'
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  //do stuff
  students: Student[];
  displayedColumns = ['studentId', 'name', 'address', 'phone', 'email', 'course', 'studentType', 'actions'];
  manualPage: number = 0;
  dataSource: any;

  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(sortData: MatSort) {
    this.sort = sortData;
    console.log(this.sort);
    this.getStudentData();
  }

  @ViewChild(MatPaginator) set matPaginator(pageData: MatPaginator) {
    this.paginator = pageData;
    console.log(this.paginator);
    this.getStudentData();
  }


  constructor(private studentService: StudentService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  getStudentData() {
    this.studentService.getStudents().subscribe(
      (data: Student[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log("Error " + error)
      }
    );
  }

  applyFilter(value: String) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editStudent(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteStudent(id) {
    this.studentService
      .deleteStudent(id)
      .subscribe(() => {
        this.getStudentData();
        this.snackBar.open('Student deleted', 'Ok', {
          duration: 3000
        });
      });
  }
}
