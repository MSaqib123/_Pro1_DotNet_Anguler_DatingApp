import { Component, inject } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  imports: [FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  messageService = inject(MessageService);
  container = 'Inbox'//'Unread';
  pageNumber = 1;
  pageSize = 5;

  ngOnInit():void{
    this.loadMessages();
  }

  loadMessages(){
    this.messageService.getMessages(this.pageNumber,this.pageSize,this.container)
  }

  pageChanged(page:number){
    if(this.pageNumber == page){
      this.pageNumber = page;
      this.loadMessages();
    }
  }

}
