import { Component, inject, input, OnChanges, OnInit, output, SimpleChanges, ViewChild } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-message',
  imports: [TimeagoModule,FormsModule],
  templateUrl: './member-message.component.html',
  styleUrl: './member-message.component.css'
})
export class MemberMessageComponent {
  @ViewChild('messageForm') messageForm?: NgForm;
  messageService = inject(MessageService)
  username = input.required<string>();
  messageContent = '';
  // updateMessages = output<Message>();
  // messages = input.required<Message[]>();

  
  //[messages]="messagesList"
  //(updateMessages)="onUpdateMessages($event)"

  sendMessage(){
    this.messageService.sendMessage(this.username(), this.messageContent).subscribe({
      next:message=>{
        // this.updateMessages.emit(message)
        this.messageForm?.reset();
      }
    })
  }

}


