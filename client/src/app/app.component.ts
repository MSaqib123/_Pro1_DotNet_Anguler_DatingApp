import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavComponent } from "./nav/nav.component";
import { ContainerComponent } from "./shared/container/container.component";
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, NavComponent, ContainerComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private accountService = inject(AccountService);
  http = inject(HttpClient); 
  title = 'client';
  users: any;

  ngOnInit(): void { 
    this.getUsers();
    this.setCurentuser();
  }

  setCurentuser(){
    const userString =localStorage.getItem('user');
    if(!userString) return;

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
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