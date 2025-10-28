import { Component, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-message',
  imports: [TimeagoModule],
  templateUrl: './member-message.component.html',
  styleUrl: './member-message.component.css'
})
export class MemberMessageComponent implements OnInit,OnChanges {
  private messageService = inject(MessageService)
  username = input.required<string>();
  messages = input.required<Message[]>();
  
  ngOnInit():void{
    // this.loadMessage();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.messages);
  }

  

  // loadMessage(){
  //   this.messageService.getMessageThread(this.username()).subscribe({
  //     next: messages => this.messages = messages
  //   })
  // }
}


