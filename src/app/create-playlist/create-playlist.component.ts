import { LoginService } from './../service/login.service';
import { PlaylistService } from './../service/playlist.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Playlists } from '../model/sample';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent {
  constructor(private audio:PlaylistService, private ser:LoginService) { }
  newPlaylist:Playlists={}
  userId?:string='';
  playlist(){
    if(this.newPlaylist.playlistId!='' && this.newPlaylist.playlistName!=''){
      this.userId=this.ser.userName;
    this.audio.createPlaylist(this.newPlaylist,this.userId).subscribe({
      next:data=>{
        console.log(data);
        alert("Playlist Created")
      },error:err=>{
        alert("Playlist creation Failed ")
      }
    });
  }else{
    alert("Fill the fields")
  }
  }

}
