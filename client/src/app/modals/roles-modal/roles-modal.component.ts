import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-roles-modal',
  imports: [],
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.css'
})
export class RolesModalComponent {
  activeModal = inject(NgbActiveModal);
  
  @Input() title!: string;
  @Input() selectedList!: string[];
  @Input() featureList!: string[];
}
