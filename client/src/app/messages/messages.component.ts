import { Component, inject } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { FormsModule } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { Message } from '../_models/message';
import { RouterLink } from '@angular/router';
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-messages',
  imports: [FormsModule, TimeagoModule, RouterLink, NgbPagination],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  messageService = inject(MessageService);
  container = 'Inbox'//'Unread';
  pageNumber = 1;
  pageSize = 5;
  isOutBox = this.container === 'Outbox';

  ngOnInit():void{
    this.loadMessages();
  }

  loadMessages(){
    this.messageService.getMessages(this.pageNumber,this.pageSize,this.container)
  }

  getRoute(message:Message){
    console.log(message)
    if(this.container === "Outbox") {
      return `/members/${message.recipientUsername}`;
    }
    else {
      return `/members/${message.senderUsername}`;
    }
  }

  pageChanged(page:number){
    if(this.pageNumber == page){
      this.pageNumber = page;
      this.loadMessages();
    }
  }

}
