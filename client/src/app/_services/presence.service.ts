import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import {HubConnection, HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';
import { NotyfService } from '../shared/notyif.service';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { Notyf, NotyfEvent } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubsUrl;
  private hubConnection? : HubConnection;
  private notyIf = inject(NotyfService);
  private router = inject(Router);
  onlineUsers = signal<string[]>([]);

  createHubConnection(user:User){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl( this.hubUrl + 'presence',{
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('UserIsOnline', username => {
      this.notyIf.info(username+' has connected');
    })

    this.hubConnection.on("UserIsOffline",username=>{
      this.notyIf.warning(username + ' has disconnected');
    })

    this.hubConnection.on('GetOnlineUsers',usernames=>{
      this.onlineUsers.set(usernames);
    })

    this.hubConnection.on('NewMessageReceived',({username,knownAs})=>{
      //========= NotyIf =========
      const toast = this.notyIf.info(knownAs + ' has sent you a new message!');
      if (toast) {
        toast.on(NotyfEvent.Click, () => {
          this.router.navigateByUrl(`/members/${username}?tab=Message`);
        });
      }
      //========= Toster =========
      // this.notyIf.info(knownAs+' has sent you a new message!')
      //   .onTap
      //   .pipe(take(1))
      //   .subscribe(()=>this.router.navigateByUrl("/members/"+username+ '?tab=Messages'))
    })
  }

  stopHubConnection(){
      if(this.hubConnection?.state === HubConnectionState.Connected){
        this.hubConnection.stop().catch(error => console.log(error))
      }
    }
    
}
