import { Component, inject, input, OnInit } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-message',
  imports: [TimeagoModule],
  templateUrl: './member-message.component.html',
  styleUrl: './member-message.component.css'
})
export class MemberMessageComponent implements OnInit {
  private messageService = inject(MessageService)
  username = input.required<string>();
  messages:Message[] =[];

  ngOnInit():void{
    this.loadMessage();
  }

  loadMessage(){
    this.messageService.getMessageThread(this.username()).subscribe({
      next: messages => this.messages = messages
    })
  }
}
