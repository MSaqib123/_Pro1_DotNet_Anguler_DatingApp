import { AfterViewChecked, AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbNav, NgbNavChangeEvent, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox'; 
import { TimeagoModule } from 'ngx-timeago';
import { MemberMessageComponent  } from '../member-message/member-message.component';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { PresenceService } from '../../_services/presence.service';
import { AccountService } from '../../_services/account.service';
import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';


@Component({
  selector: 'app-member-detail',
  imports: [RouterLink, DatePipe, NgbNavModule, GalleryModule, LightboxModule, TimeagoModule, DatePipe, MemberMessageComponent,TimeagoModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('nav', { static: true }) navTabs?: NgbNav;
  private messageService = inject(MessageService);
  private accountService = inject(AccountService);
  private router = inject(Router);
  presenceService = inject(PresenceService);
  private route = inject(ActivatedRoute);
  member: Member = {} as Member;
  images: GalleryItem[] = []; 
  active = 1;
  // messagesList:Message[] =[]; 

  
  ngOnInit(): void {
      this.route.data.subscribe({
        next: data => {            
            this.member = data['member'];
            this.member &&  this.member.photos.map(photo => {
            this.images = this.images || [];
            this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
          });
        }
      })

    this.route.paramMap.subscribe({
      next: _ => this.onRouteParamsChange()
    })

    this.route.queryParams.subscribe({
      next: params=>{
        console.log(params['tab']);
        if(params['tab'] === "Message"){
           this.selectTab(4)
        }
      }
    })
  }

  onRouteParamsChange(){
    const user = this.accountService.currentUser();
    if(!user) return;
    if(this.messageService.hubConnection?.state === HubConnectionState.Connected && this.active === 4)
    {
      this.messageService.hubConnection.stop().then(()=>{
        this.messageService.CreateHubConnection(user,this.member.userName)
      })
    }
  }

  messagesLoaded = false;
  onTabChange($event: NgbNavChangeEvent) {
    const tabs = $event.nextId == 4 ? "Message" : $event.nextId;
    this.router.navigate([],{
      relativeTo:this.route,
      queryParams: {tab: tabs},
      queryParamsHandling:'merge'
    })

    if ($event.nextId === 4 && !this.messagesLoaded) {
      this.selectTab($event.nextId)
    }
  }

  selectTab(tabId: number) {
    if (!this.navTabs) return;
    this.navTabs.select(tabId);
    this.handleTabChangeLogic(tabId);
  }

  private handleTabChangeLogic(tabId: number) {
    if (tabId === 4 && this.member) {
      const user = this.accountService.currentUser();
      if(!user) return;
      console.log(user,"User")
      this.messageService.CreateHubConnection(user,this.member.userName);
      // this.messageService.getMessageThread(this.member.userName).subscribe({
      //   next: messages => {
      //     this.messagesList = messages;
      //     console.log('Messages loaded:', this.messagesList);
      //   }
      // });
      this.messagesLoaded = true;
    }
    else{
      this.messageService.stopHubConnection();
    }
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
  
  
  // onUpdateMessages(event:Message){
  //   this.messagesList.push(event);
  // }


  // loadMember(){
  //   const username = this.route.snapshot.paramMap.get('username');
  //   if(!username) return;
  //   this.memberService.getMember(username).subscribe({
  //     next: member => {
  //       this.member = member;
  //       member.photos.map(photo => {
  //         this.images = this.images || [];
  //         this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
  //       });
  //     }
  //   });
  // }

}
