import { LoginService } from './../service/login.service';
import { PlaylistService } from './../service/playlist.service';

import { track } from './../model/track';
import { Component, OnInit } from '@angular/core';
import { MusicserviceService } from '../service/musicservice.service';
import { Playlists, Tracks } from '../model/sample';

@Component({
  selector: 'app-addtoplaylist',
  templateUrl: './addtoplaylist.component.html',
  styleUrls: ['./addtoplaylist.component.css']
})
export class AddtoplaylistComponent implements OnInit {



  tracks: Playlists[] = [];
  emp: Tracks= {};

  audioObj: HTMLAudioElement | null = null;
  progress = '0%';
  Url: string | undefined;
  isPlaying = false;
  isClicked: any;
  trackId: string | undefined;
  trackName: string | undefined;
  selectedPlaylist: any;



  constructor(private music: MusicserviceService,private plays:PlaylistService,private log:LoginService) {}

  ngOnInit(): void {


    this.plays.getPlaylist(this.log.userName).subscribe({
      next:data=>{
        this.tracks = data;
        console.log(data);

      },error:err=>{
        alert("Playlist not fetched ")
      }
    });
  }


  ngOnChanges() {
    console.log(this.emp);
    this.Url = this.emp?.musicPath;
    this.trackId = this.emp?.trackId;
    this.trackName = this.emp?.trackName;


  }
event(){
  if(this.isClicked){
    this.isClicked=false;
  }
  else{
    this.isClicked=true;
  }
}

playSong() {
  if (this.audioObj && !this.audioObj.paused) {
    this.audioObj.pause();
    return;
  }
  this.audioObj = new Audio(this.Url);
  this.audioObj.play();
  this.audioObj.addEventListener('timeupdate', () => {
    const duration = this.audioObj?.duration || 0;
    const currentTime = this.audioObj?.currentTime || 0;
    const progress = currentTime / duration * 100;
    this.progress = `${progress}%`;
  });
}
}








