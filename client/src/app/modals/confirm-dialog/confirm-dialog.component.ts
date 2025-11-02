import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  activeModal = inject(NgbActiveModal);

  @Input() title = 'Confirmation';
  @Input() message = 'Are you sure you want to do this?';
  @Input() btnOkText = 'Ok';
  @Input() btnCancelText = 'Cancel';

  confirm() {
    this.activeModal.close(true); // Return true
  }

  decline() {
    this.activeModal.dismiss(false); // Return false
  }
}