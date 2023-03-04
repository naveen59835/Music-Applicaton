import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';
import { User } from '../model/Customer';
import { Tracks, User1 } from '../model/sample';
import { track } from '../model/track';
import { LoginService } from '../service/login.service';
import { MusicserviceService } from '../service/musicservice.service';
import { PlaylistService } from '../service/playlist.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnChanges {
  progress = '0%';
  trackId: string | undefined;
  trackName: string | undefined;
  constructor(private music:MusicserviceService,private play:PlaylistService,private log:LoginService) {}

  @Input('musicone') emp: Tracks= {};
  audioObj: HTMLAudioElement | null = null;
  Url: string | undefined;

  searchTerm: string = '';
  filteredTracks: track[] = [];
  showForm: boolean = false;

  selectedPlaylist: string = '';
  newPlaylist: string ='';
  isClicked: boolean = false;
  playlistId:string='';
  playlistName:string='';
  data:any ;

ngOnChanges() {
    console.log(this.emp);
    this.Url = this.emp?.musicPath;
    this.trackId = this.emp?.trackId;
    this.trackName = this.emp?.trackName;


  }

  playSong() {
    if (!this.audioObj) {
      this.audioObj = new Audio(this.Url);
      this.audioObj.play();
      this.audioObj.addEventListener('timeupdate', () => {
        const duration = this.audioObj?.duration || 0;
        const currentTime = this.audioObj?.currentTime || 0;
        const progress = currentTime / duration * 100;
        this.progress = `${progress}%`;
      });


      console.log(`Playing track ${this.trackId}: ${this.trackName}`);
    } else if (this.audioObj.paused) {
      this.audioObj.play();
    } else {
      this.audioObj.pause();
    }
  }

  skipToPosition(event: MouseEvent) {
    if (this.audioObj) {
      const progressElement = event.currentTarget as HTMLElement;
      const rect = progressElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const width = rect.width;
      const percent = x / width;
      const newTime = this.audioObj.duration * percent;
      this.audioObj.currentTime = newTime;
    }
  }


addSong(){

  this.play.addSong(this.playlistId,this.emp.trackId,this.log.userName,this.data).subscribe({
    next:data=>{
      alert("song added to playlist");
      console.log(data);
    },error:err=>{
      alert("Error adding song");
    }
  })
}
onClick(){

  if(this.isClicked){
    this.isClicked=false;
  }
  else{
    this.isClicked=true;
  }

}

}



