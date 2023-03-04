import { track } from './../model/track';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/Customer';

@Injectable({
  providedIn: 'root'
})
export class MusicserviceService {


  private URL = "http://localhost:9999/api/v2/allusers/tracks";
  track:track={};
  // tracks: track[] = [];
  tracks: track[] = [];
  // music: track;



  constructor(private httpClient:HttpClient) { }
  getEmployeesList(): Observable <User[]>{
        const requestHeader=new HttpHeaders().set('authorization','Bearer' + window.localStorage.getItem('Token'));

    return this.httpClient.get<User[]>(this.URL,{'headers':requestHeader});


  }


}








