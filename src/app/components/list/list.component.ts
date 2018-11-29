import { Component, OnInit, ViewChild } from '@angular/core';

/**
 * Import the student services 
 * Router
 * Angular Material
 */
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

  /**
   * Create an array of type Student
   */
  students: Student[];

  /**
   * Prefix the names of the columns in the table
   */
  displayedColumns = ['studentId', 'name', 'address', 'phone', 'email', 'course', 'studentType', 'actions'];
  manualPage: number = 0;
  dataSource: any;

  /**
   * Use Paginator and Sort from angular material
   */
  private paginator: MatPaginator;
  private sort: MatSort;

  /**
   * Sort the table 
   */
  @ViewChild(MatSort) set matSort(sortData: MatSort) {
    this.sort = sortData;
    this.getStudentData();
  }

  /**
   * Provide Pagination in the table
   */
  @ViewChild(MatPaginator) set matPaginator(pageData: MatPaginator) {
    this.paginator = pageData;
    this.getStudentData();
  }

  /**
   * Dependency Injection
   * 
   * @param studentService 
   * @param snackBar 
   * @param router 
   */
  constructor(private studentService: StudentService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  /**
   * Get all the student data back from the database using services
   * Filter the data using MatTableDataSource which works as PIPE
   * and help sorting the data and pagination
   * 
   */
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

  /**
   * 
   * @param value Used to filter and display the data in table
   * 
   */
  applyFilter(value: String) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * 
   * @param id To edit the student the use the id and navigaet to the edit page
   */
  editStudent(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  /**
   * 
   * @param id Delete the student based on the id and display the information
   * 
   */
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
