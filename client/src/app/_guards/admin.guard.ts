import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { NotyfService } from '../shared/notyif.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const notyf = inject(NotyfService);

  if(accountService.roles().includes('Admin') || accountService.roles().includes("Moderator")){
    return true;
  }
  else{
    notyf.error("You Can not enter in this area");  
    return false;
  }
};
