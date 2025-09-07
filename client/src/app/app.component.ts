import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports:[CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient); 
  title = 'client';
  users: any;

  ngOnInit(): void {
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