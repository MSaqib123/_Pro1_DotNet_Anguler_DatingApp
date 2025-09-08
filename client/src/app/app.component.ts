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
  title = 'client';

  ngOnInit(): void { 
    this.setCurentuser();
  }

  setCurentuser(){
    const userString =localStorage.getItem('user');
    if(!userString) return;

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

}