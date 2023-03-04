import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/Customer';
import { Tracks } from '../model/sample';

@Injectable({
  providedIn: 'root'
})
export class AudioService {




  private URL = "http://localhost:9999/api/v2/musics";
  // track:track={};

  // tracks: track[] = [];




  constructor(private httpClient:HttpClient) { }
  getEmployeesList(): Observable <Tracks[]>{
         const requestHeader=new HttpHeaders().set('authorization','Bearer' + window.sessionStorage.getItem('Token'));

    return this.httpClient.get<Tracks[]>(this.URL,{'headers':requestHeader});


  }
}
