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
  
  @ViewChild('memberTabs', { static: false }) memberTabs?: NgbNav;
  private memberService = inject(MembersService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  messagesList:Message[] =[];
  member?: Member;
  active = 1;  
  images: GalleryItem[] = []; 

  
  ngOnInit(): void {
    this.loadMember();
    this.route.queryParams.subscribe({
      next: params=>{
        params['tab'] && this.selectTab(params['tab'])
      }
    })
  }

  selectTab(tabId: number) {
    console.log(this.memberTabs);
    this.memberTabs?.select(tabId)
  }


  
  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        member.photos.forEach(photo => {
          this.images = this.images || [];
          this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
        });
      }
    });
  }


  messagesLoaded = false;
  onTabChange($event: NgbNavChangeEvent) {
    if ($event.nextId === 4 && !this.messagesLoaded) {
      
      this.messageService.getMessageThread(this.member!.userName).subscribe({
        next: messages => {
          console.log(messages)
          this.messagesList = messages
          console.log(this.messagesList)
        }
      })
      this.messagesLoaded = true;
    }
  }



  


}
