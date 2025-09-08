import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ContainerComponent } from "../shared/container/container.component";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-home',
  imports: [ContainerComponent, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit  {
  http = inject(HttpClient); 

  users: any;
  registerMode = false;

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }






  getUsers(){
     this.http.get('https://localhost:5001/api/user').subscribe({
      next: (response) => {
        console.log("✅ API Response:", response);  
        this.users = response;                     
      },
      error: (error) => {
        console.error("❌ API Error:", error);     
      },
      complete: () => {
        console.log("✅ Request completed successfully");
      }
    });
  }
}
