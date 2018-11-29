import { Injectable } from '@angular/core';

/**
 * Import HTTP client
 */
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /**
   * Define the url where the server is going to return the data
   */
  url='http://localhost:8081';

  /**
   * 
   * @param http Dependency Injection
   */
  constructor(private http:HttpClient) { }

  /**
   * Return all users information
   */
  getUsers(){
    return this.http.get(`${this.url}/login`);
  }
  
  /**
   * 
   * @param userId User ID used as EMAIL 
   * @param password to Login
   */
  addUsers(userId,password){
    const user ={
     userId:userId,
     password:password
    };
    return this.http.post(`${this.url}/login/register`,user);
  }
}
