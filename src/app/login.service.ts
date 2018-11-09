import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url='http://localhost:8081';
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(`${this.url}/login`);
  }
  
  addUsers(userId,password){
    const user ={
     userId:userId,
     password:password
    };
    return this.http.post(`${this.url}/login/register`,user);
  }
}
