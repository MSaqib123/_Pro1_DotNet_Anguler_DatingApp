import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // Note old angular
  // @Input() userFromHomeComponent:any;

  // Note signal
  userFromHomeComponent = input<any>();
  
  model:any={};

  regsiter(){
    console.log(this.model);
  }

  cancel(){
    console.log("cancelled");
  }
}
