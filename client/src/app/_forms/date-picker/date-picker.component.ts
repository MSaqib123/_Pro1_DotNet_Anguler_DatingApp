import { JsonPipe, NgIf } from "@angular/common";
import { Component, input, Self } from "@angular/core";
import { ControlValueAccessor, FormControl, FormsModule, NgControl, ReactiveFormsModule } from "@angular/forms";
import { NgbAlertModule, NgbDatepickerConfig, NgbDatepickerModule, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [NgbDatepickerModule, ReactiveFormsModule, FormsModule, NgbAlertModule, JsonPipe, NgIf],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent implements ControlValueAccessor {
  label = input<string>();
  maxDate =  input<Date>();
  model: NgbDateStruct | null = null;
  disabled = false;

  constructor(
    @Self() public ngControl: NgControl,
    private config: NgbDatepickerConfig
  ) {
    this.ngControl.valueAccessor = this;
    this.config.displayMonths = 2; // Show multiple months
    this.config.outsideDays = 'hidden';
    this.config.showWeekNumbers = false;
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
  // Convert maxDate to NgbDateStruct if provided
  get maxDateStruct(): NgbDateStruct | undefined {
    if (this.maxDate()) {
      return {
        year: this.maxDate()!.getFullYear(),
        month: this.maxDate()!.getMonth() + 1,
        day: this.maxDate()!.getDate()
      };
    }
    return undefined;
  }


  writeValue(): void {
  }
  registerOnChange(): void {
  }
  registerOnTouched(): void {
  }
  setDisabledState(): void {
  }
}















// @Component({
//   selector: 'app-date-picker',
//   standalone: true,
//   imports: [NgbDatepickerModule, ReactiveFormsModule, FormsModule, NgbAlertModule, JsonPipe, NgIf],
//   // providers: [
//   //   { provide: NgbDateParserFormatter, useClass: CustomNgbDateParserFormatter, }
//   // ],
//   templateUrl: './date-picker.component.html',
//   styleUrl: './date-picker.component.css'
// })
// export class DatePickerComponent implements ControlValueAccessor {
//   label = input<string>();
//   maxDate =  input<Date>();
//   model: NgbDateStruct | null = null;
//   disabled = false;

//   constructor(
//     @Self() public ngControl: NgControl,
//     private config: NgbDatepickerConfig
//   ) {
//     this.ngControl.valueAccessor = this;
//     this.config.displayMonths = 2; // Show multiple months
//     this.config.outsideDays = 'hidden';
//     this.config.showWeekNumbers = false;
//   }

//   get control(): FormControl {
//     return this.ngControl.control as FormControl;
//   }
//   // Convert maxDate to NgbDateStruct if provided
//   get maxDateStruct(): NgbDateStruct | undefined {
//     if (this.maxDate()) {
//       return {
//         year: this.maxDate()!.getFullYear(),
//         month: this.maxDate()!.getMonth() + 1,
//         day: this.maxDate()!.getDate()
//       };
//     }
//     return undefined;
//   }




  
//   writeValue(): void {
//   }
//   registerOnChange(): void {
//   }
//   registerOnTouched(): void {
//   }
//   setDisabledState(): void {
//   }
// }





