import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../_models/user';


@Component({
  selector: 'app-roles-modal',
  imports: [],
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.css'
})
export class RolesModalComponent {
  activeModal = inject(NgbActiveModal);
  username = '';
  @Input() users:User[] = [];
  @Input() title!: string;
  @Input() selectedRoles: string[] = [];
  @Input() availableRoles: string[] = [];
  @Input() rolesUpdated: boolean=false;

  updateChecked(checkedValue:string){
    if(this.selectedRoles.includes(checkedValue)){
      this.selectedRoles = this.selectedRoles.filter(r=>r !== checkedValue)
    }
    else{
      this.selectedRoles.push(checkedValue);
    }
  }

  onSelectRoles(){
    this.rolesUpdated = true;
    this.activeModal.close();
  }
}
