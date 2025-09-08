import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router'; // Correct import
import { NavComponent } from './nav/nav.component';
import { ContainerComponent } from './shared/container/container.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Add RouterModule for routing functionality
    RouterOutlet,
    NavComponent,
    ContainerComponent,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fix: Use styleUrls (plural)
})
export class AppComponent implements OnInit {
  private accountService = inject(AccountService);
  title = 'client';

  ngOnInit(): void {
    this.setCurrentUser(); // Fix typo
  }

  setCurrentUser() { // Fix method name
    const userString = localStorage.getItem('user');
    if (!userString) return;

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}