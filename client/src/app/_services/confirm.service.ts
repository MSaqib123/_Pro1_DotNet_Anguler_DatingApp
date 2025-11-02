import { Injectable, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  private modalService = inject(NgbModal);

  confirm(
    title = 'Confirmation',
    message = 'Are you sure you want to do this?',
    btnOkText = 'Ok',
    btnCancelText = 'Cancel'
  ): Promise<boolean> {
    const modalRef: NgbModalRef = this.modalService.open(ConfirmDialogComponent, {
      centered: false,
      backdrop: 'static',
    });

    // Pass data to modal
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    
    // Return promise
    return modalRef.result
      .then(
        (result) => result === true, // OK → true
      )
      .catch(() => false); // Closed by backdrop → false
  }  
}