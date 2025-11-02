import { AfterViewChecked, Component, inject, input, OnChanges, OnInit, output, SimpleChanges, ViewChild } from '@angular/core';
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
export class MemberMessageComponent implements AfterViewChecked{
  
  @ViewChild('messageForm') messageForm?: NgForm;
  @ViewChild('scrollMe') scrollContainer? : any;
  messageService = inject(MessageService)
  username = input.required<string>();
  messageContent = '';
  // updateMessages = output<Message>();
  // messages = input.required<Message[]>();

  
  //[messages]="messagesList"
  //(updateMessages)="onUpdateMessages($event)"

  
  //==== signalR base ====
  sendMessage(){
    this.messageService.sendMessage(this.username(), this.messageContent).then(()=>{
      this.messageForm?.reset();
      this.scrollToBottom();
    })
  }
  //===== simple api send messasge
  // sendMessage(){
  //   this.messageService.sendMessage(this.username(), this.messageContent).subscribe({
  //     next:message=>{
  //       // this.updateMessages.emit(message)
  //       this.messageForm?.reset();
  //     }
  //   })
  // }


  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  private scrollToBottom(){
    if(this.scrollContainer){
      console.log(this.scrollContainer, "aaaaa")
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

}


