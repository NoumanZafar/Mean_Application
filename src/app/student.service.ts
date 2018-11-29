import { Injectable } from '@angular/core';

/**
 * Import the HTTP client from angular module
 */
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  /**
   * Define the url
   */
  url='http://localhost:8081';

  /**
   * 
   * @param http Dependency Injection
   */
  constructor(private http:HttpClient) { }

  /**
   * Get the student data and return to the url defined above /students
   */
  getStudents(){
    return this.http.get(`${this.url}/students`);
  }

  /**
   * 
   * @param id Search the student by the given id and return the information
   */
  getStudentById(id){
    return this.http.get(`${this.url}/students/${id}`);
  }

  /**
   * Take the following information about the student and add the student in the datatbse
   * 
   * @param studentId 
   * @param name 
   * @param address 
   * @param phone 
   * @param email 
   * @param course 
   * @param studentType Full/Part time
   */
  addStudent(studentId,name,address,phone,email,course,studentType){
    const student ={
      studentId: studentId,
      name: name,
      address:address,
      phone:phone,
      email:email,
      course:course,
      studentType:studentType
    };
    return this.http.post(`${this.url}/students/add`,student);
  }

  /**
   * 
   * @param id Data id in the Database it can be represented by _id
   * @param studentId 
   * @param name 
   * @param address 
   * @param phone 
   * @param email 
   * @param course 
   * @param studentType 
   */
  updateStudent(id,studentId,name,address,phone,email,course,studentType){
    const student ={
      studentId: studentId,
      name: name,
      address:address,
      phone:phone,
      email:email,
      course:course,
      studentType:studentType
    };
    return this.http.post(`${this.url}/students/update/${id}`,student);
  }

  /**
   * 
   * @param id Use this id number and delete the matching id record from the database
   */
  deleteStudent(id){
    return this.http.get(`${this.url}/students/delete/${id}`);
  }
}
