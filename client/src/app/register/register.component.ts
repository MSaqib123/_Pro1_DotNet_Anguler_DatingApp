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

import { Component, inject, input, OnInit, output} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { JsonPipe, NgIf } from '@angular/common';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from "../_forms/date-picker/date-picker.component";
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe, NgIf, TextInputComponent, DatePickerComponent,NgbDatepicker],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private router= inject(Router);
  private fb = inject(FormBuilder);
  userFromHomeComponent = input.required<any>();
  cancelRegister = output<boolean>();
  registerForm : FormGroup = new FormGroup({});
  validationErrors:string[] | undefined;

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(){
    //========== 1st way ===========
    // this.registerForm = new FormGroup({
      //   userName: new FormControl('',Validators.required),
      //   password: new FormControl('',[Validators.required,Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('',[Validators.required,this.matchValues('password')]),
    // });
    // this.registerForm.controls['password'].valueChanges.subscribe({
    //   next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    // })

    //========== 2nd way ===========
    this.registerForm = this.fb.group({
      gender: ['male'],
      userName: ['',Validators.required],
      knownAs: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required,this.matchValues('password')]],
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

    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({dateOfBirth:dob}); 
    this.accountService.register(this.registerForm.value).subscribe({
      next:_=>this.router.navigateByUrl('/members'),
      error:(error)=>{
        this.validationErrors = error;
      },
      complete:()=> console.log("..")
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob:string | undefined){
    if(!dob) return;
    return new Date(dob).toISOString().slice(0,10);
  }
  
}

// #endregion

