import { Component, EventEmitter, input, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // Note old Decorator
  // @Input() userFromHomeComponent:any;
  // @Output() cancelRegister = new EventEmitter();

  // Note signal
  userFromHomeComponent = input.required<any>();
  cancelRegister = output<boolean>();
  
  model:any={};

  regsiter(){
    console.log(this.model);
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
