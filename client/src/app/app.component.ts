import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  http = inject(HttpClient); 
  title = 'client';
  users:any;

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/user').subscribe({
      next:response=> this.users = response,
      error:error=>console.log(error),
      complete:()=> console.log("complete the requiest")
    });
  }
}
