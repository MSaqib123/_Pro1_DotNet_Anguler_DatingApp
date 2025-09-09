import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { NotyfService } from '../shared/notyif.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const notyf = inject(NotyfService);
  if(accountService.currentUser()){
    return true;
  }
  else{
    notyf.error("You shall not pass!!");
    return false;
  }

};
