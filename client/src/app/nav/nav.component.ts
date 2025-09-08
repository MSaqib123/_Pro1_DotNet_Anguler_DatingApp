import { Component, inject } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink,RouterLinkActive  } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, CommonModule, NgbDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  model:any = {};
  login(){
    //console.log(this.model);
    // ===============
    // Abservable  we have to subscribe to abservable because they are lazzy
    this.accountService.login(this.model).subscribe({
      next: _ => {
        void this.router.navigateByUrl('/members');
      },
      error: error=> console.log(error),
      complete: () => {
        console.log("✅ Request completed successfully");
      }
    });
  }

  logout(){
    this.accountService.logout();
    void this.router.navigateByUrl('/');
  }
}
