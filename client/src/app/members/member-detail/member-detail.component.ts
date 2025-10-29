import { AfterViewChecked, AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
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


@Component({
  selector: 'app-member-detail',
  imports: [RouterLink, DatePipe, NgbNavModule, GalleryModule, LightboxModule, TimeagoModule, DatePipe, MemberMessageComponent,TimeagoModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
  
  @ViewChild('nav', { static: true }) navTabs?: NgbNav;
  private messageService = inject(MessageService);
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  messagesList:Message[] =[];
  member: Member = {} as Member;
  images: GalleryItem[] = []; 
  active = 1;

  
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

    this.route.queryParams.subscribe({
      next: params=>{
        console.log(params['tab']);
        if(params['tab'] === "Message"){
           this.selectTab(4)
        }
      }
    })
  }

  messagesLoaded = false;
  onTabChange($event: NgbNavChangeEvent) {
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
    if (tabId === 4 && !this.messagesLoaded && this.member) {
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: messages => {
          this.messagesList = messages;
          console.log('Messages loaded:', this.messagesList);
        }
      });
      this.messagesLoaded = true;
    }
  }
  
  onUpdateMessages(event:Message){
    this.messagesList.push(event);
  }


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
