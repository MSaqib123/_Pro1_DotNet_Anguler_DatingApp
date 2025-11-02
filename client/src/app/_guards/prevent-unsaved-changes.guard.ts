import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { inject } from '@angular/core';
import { ConfirmService } from '../_services/confirm.service';
import { from } from 'rxjs';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> =async (component) => {

  const confirmService = inject(ConfirmService);

  if(component.editForm?.dirty){
    const confirmed = await confirmService.confirm(
        'Unsaved Changes',
        'You have unsaved changes. Do you really want to leave?',
        'Leave',
        'Stay'
      );
      console.log(confirmed)
      return confirmed ?? false; // true = leave, false = stay
    //return confirm("You have unsaved changes. Do you really want to leave?");
  }
  return true;
};
