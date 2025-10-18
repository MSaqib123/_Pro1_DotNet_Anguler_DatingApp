import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-test-errors',
  //imports: [HttpClientModule], // Add HttpClientModule here
    imports: [CommonModule], // Add HttpClientModule here
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  validationErrors : string[]= [];

  get400Error(){
    this.http.get(this.baseUrl+"Buggy/bad-request").subscribe({
      next: (response) => console.log(response),
      error: error => {
        console.log(error);
      }
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
  
  get400ValidationError(){
    this.http.post(this.baseUrl+"Account/register",{}).subscribe({
      next: (response) => console.log(response),
      error: error =>{
         console.log(error)
         this.validationErrors = error;
      }
    })
  }

}
