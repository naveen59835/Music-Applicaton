import { MusicDetailsComponent } from './music-details/music-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddtoplaylistComponent } from './addtoplaylist/addtoplaylist.component';
import { ActivateGuard } from './guards/activate.guard';
import { DeactivateGuard } from './guards/deactivate.guard';
import { DeactivateguardGuard } from './guards/deactivateguard.guard';
import { ImageViewComponent } from './image-view/image-view.component';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';


const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"login", component:LoginComponent,canDeactivate:[DeactivateGuard]},//candeactivate
  {path:"registration",component:RegistrationComponent,canDeactivate:[DeactivateguardGuard]},//candeactivate
  {path:"music",component:MusicDetailsComponent, canActivate:[ActivateGuard]},//canactivate
  {path:"playlist",component:AddtoplaylistComponent,  canActivate:[ActivateGuard]},//canactivate
  {path:"newPlaylist",component:CreatePlaylistComponent,canActivate:[ActivateGuard]},
  {path:"sample",component:ImageViewComponent},
  {path:"", redirectTo:"/home",pathMatch:'full'},
  {path:"**", component: NotfoundComponent},


];


  @NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }



