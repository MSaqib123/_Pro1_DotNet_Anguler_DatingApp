// #region  Section 1 to 10

// import { Component, EventEmitter, inject, input, output, Output } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// import { AccountService } from '../_services/account.service';

// @Component({
//   selector: 'app-register',
//   imports: [FormsModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {
//   private accountService = inject(AccountService);
//   // Note old Decorator
//   // @Input() userFromHomeComponent:any;
//   // @Output() cancelRegister = new EventEmitter();

//   // Note signal
//   userFromHomeComponent = input.required<any>();
//   cancelRegister = output<boolean>();
  
//   model:any={};

//   regsiter(){
//     //console.log(this.model);
//     this.accountService.register(this.model).subscribe({
//       next:(response)=>{
//         console.log(response);
//         this.cancel();
//       },
//       error:(error)=>console.log(error),
//       complete:()=> console.log("..")
//     })
//   }

//   cancel(){
//     this.cancelRegister.emit(false);
//   }
// }

// #endregion



// #region  Section 11 to 20

import { Component, inject, input, OnInit, output, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup,ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,JsonPipe,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  
  private accountService = inject(AccountService);
  userFromHomeComponent = input.required<any>();
  cancelRegister = output<boolean>();
  model:any={};
  registerForm : FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(){
    this.registerForm = new FormGroup({
      userName: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required,Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('',[Validators.required,this.matchValues('password')]),
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo:string):ValidatorFn{
    return(control: AbstractControl)=>{
      return control.value===control.parent?.get(matchTo)?.value ? null : {isMatching:true}
    }
  }

  regsiter(){
    console.log(this.registerForm.value);
    // this.accountService.register(this.model).subscribe({
    //   next:(response)=>{
    //     console.log(response);
    //     this.cancel();
    //   },
    //   error:(error)=>console.log(error),
    //   complete:()=> console.log("..")
    // })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

  
}

// #endregion

