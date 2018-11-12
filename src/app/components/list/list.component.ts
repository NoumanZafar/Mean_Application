import { Component, OnInit, ViewChild } from '@angular/core';

//import here
import { StudentService } from '../../student.service';
import { Router } from '@angular/router';
import { Student } from '../../student.model'
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  //do stuff
  students: Student[];
  displayedColumns = ['studentId', 'name', 'address', 'phone', 'email', 'course', 'studentType', 'actions'];
  manualPage:number=0;
  dataSource: any;
  @ViewChild(MatPaginator) paginatorModule: MatPaginator;

  constructor(private studentService: StudentService,
    private snackBar:MatSnackBar,
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

  onPaginateChange(event){
   // alert(JSON.stringify("Current page index: " + event.pageIndex));
   console.log('Number Clicked')
  }

  /*
 updatePage(index: number) {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginatorModule = this.paginatorModule;
      this.manualPage = index;
      this.paginatorModule.pageIndex = index;
      this.paginatorModule.page.next({
        pageIndex: this.paginatorModule.pageIndex,
        pageSize: this.paginatorModule.pageSize,
        length: this.paginatorModule.length
      });
    });
  }

  clearManualPage() {
    this.manualPage = 0;
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
*/


  editStudent(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteStudent(id) {
    this.studentService
      .deleteStudent(id)
      .subscribe(() => {
        this.getStudentData();
        this.snackBar.open('Student deleted','Ok',{
          duration:3000
        });
      });
  }

  onRowClicked(row) {
    //somthing else needs to be done here
    //for the momment just print out in console
    console.log('Row Clicked :', row);
  }

}
