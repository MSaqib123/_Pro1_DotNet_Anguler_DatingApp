import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-test-errors',
    imports: [HttpClientModule], // Add HttpClientModule here
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);
  validationErrors : string[]= [];

  get400Error(){
    this.http.get(this.baseUrl+"Buggy/bad-request").subscribe({
      next: (response) => console.log(response),
      error: error => console.log(error)
    })
  }
  get401Error(){
    this.http.get(this.baseUrl+"Buggy/auth").subscribe({
      next: (response) => console.log(response),
      error: error => console.log(error)
    })
  }
  get404Error(){
    this.http.get(this.baseUrl+"Buggy/not-found").subscribe({
      next: (response) => console.log(response),
      error: error => console.log(error)
    })
  }
  
  get500Error(){
    this.http.get(this.baseUrl+"Buggy/server-error").subscribe({
      next: (response) => console.log(response),
      error: error => console.log(error)
    })
  }
  
  // get400ValidationError(){
  //   this.http.post(this.baseUrl+"Account/register",{}).subscribe({
  //     next: (response) => console.log(response),
  //     error: error =>{
  //        console.log(error)
  //        alert();
  //        debugger;
  //        this.validationErrors = error.error;
  //     }
  //   })
  // }

  get400ValidationError() {
  this.http.post(this.baseUrl + "Account/register", {}).subscribe({
    next: (response) => console.log(response),
    error: error => {
      console.log('Error response:', error); // Log the full error for debugging
      if (error.error && Array.isArray(error.error)) {
        // If error.error is already an array
        this.validationErrors = error.error;
      } else if (error.error && error.error.errors) {
        // If error.error.errors is an object (ASP.NET Core validation format)
        this.validationErrors = [];
        for (const key in error.error.errors) {
          if (error.error.errors[key]) {
            this.validationErrors.push(...error.error.errors[key]);
          }
        }
      } else {
        // Fallback for unexpected error formats
        this.validationErrors = ['An unexpected error occurred'];
      }
      console.log('Validation Errors:', this.validationErrors); // Log the processed errors
    }
  });
}
}
