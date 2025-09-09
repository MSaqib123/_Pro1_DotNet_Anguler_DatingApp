import { Component, inject } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink,RouterLinkActive  } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { NotyfService } from '../shared/notyif.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, CommonModule, NgbDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private notyf = inject(NotyfService);

  model:any = {};
  login(){
    this.accountService.login(this.model).subscribe({
      next: _ => {
        void this.router.navigateByUrl('/members');
        this.notyf.success("Login Successfully");
      },
      error: error=> {
        console.log(error);
        this.notyf.error("Login Faild");
      },
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
