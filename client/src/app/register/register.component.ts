import { Component, EventEmitter, inject, input, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  // Note old Decorator
  // @Input() userFromHomeComponent:any;
  // @Output() cancelRegister = new EventEmitter();

  // Note signal
  userFromHomeComponent = input.required<any>();
  cancelRegister = output<boolean>();
  
  model:any={};

  regsiter(){
    //console.log(this.model);
    this.accountService.register(this.model).subscribe({
      next:(response)=>{
        console.log(response);
        this.cancel();
      },
      error:(error)=>console.log(error),
      complete:()=> console.log("..")
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
