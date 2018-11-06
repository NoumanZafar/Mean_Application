import { Injectable } from '@angular/core';
//add imports here
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  //do stuff here
  url='http://localhost:8081';

  constructor(private http:HttpClient) { }

  getStudents(){
    return this.http.get(`${this.url}/students`);
  }

  getStudentById(id){
    return this.http.get(`${this.url}/students/${id}`);
  }

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

  deleteStudent(id){
    return this.http.get(`${this.url}/students/delete/${id}`);
  }
}
