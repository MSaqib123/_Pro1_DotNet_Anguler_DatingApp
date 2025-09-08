import { Component, inject } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AccountService } from '../_services/account.service';
@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private accountService = inject(AccountService);
  model:any = {};
  loggedIn = false;

  login(){
    //console.log(this.model);
    // ===============
    // Abservable  we have to subscribe to abservable because they are lazzy
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response,"api Response");
        this.loggedIn = true;
      },
      error: error=> console.log(error),
      complete: () => {
        console.log("✅ Request completed successfully");
      }
    });
  }
}
