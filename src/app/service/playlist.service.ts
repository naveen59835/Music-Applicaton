import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlists } from '../model/sample';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private httpClient:HttpClient) { }
  private URL:string='http://localhost:9999/api/v2/playlist/create-playlist/'
  private URL2:string='http://localhost:9999/api/v2/playlist/'
  private URL3:string='http://localhost:9999/api/v2/playlist/view-playlists/'
createPlaylist(data:any,userId:string){
  return this.httpClient.post(this.URL+userId,data);
}

addSong(playlistId?:string,songId?:string,username?:string,data?:any){

  return this.httpClient.post(`${this.URL2}${playlistId}/add-song/${songId}/${username}`,data,);

}
getPlaylist(userId:string):Observable<Playlists[]>{
  return this.httpClient.get<Playlists[]>(this.URL3+userId);
}
}
