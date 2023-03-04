import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export type Login = {
  userId: string;
  password: string;

}


@Injectable({
  providedIn: 'root'
})


export class LoginService {
  userName: string='';
  isLoggedIn: boolean = false;

  private URL = "http://localhost:9999/api/v1/checkauth";
  constructor(private http: HttpClient) { }

  verifyLogin(data:any) {
    return this.http.post(this.URL,data);
  }


}


