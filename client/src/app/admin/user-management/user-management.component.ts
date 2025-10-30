import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { User } from '../../_models/user';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';
import { NgbActiveModal, NgbModal , NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  private adminService = inject(AdminService);
  users: User[] = [];

  private modalService = inject(NgbModal);
  private bsModalRef?: NgbModalRef;
  openRoleModal() {
    // Step 1: Open modal with correct options (NO initialState!)
    this.bsModalRef = this.modalService.open(
      RolesModalComponent
      // ,{
      //   size: 'lg',
      //   backdrop: 'static', 
      //   keyboard: false     
      // }
    );

    // Step 2: NOW set data via componentInstance
    const modalComponent = this.bsModalRef.componentInstance as RolesModalComponent;
    modalComponent.title = 'User roles';
    modalComponent.selectedList = ['Admin', 'Member'];
    modalComponent.featureList = ['Admin', 'Moderator', 'Member'];
  }

  
  ngOnInit(): void {
    this.getUsersWithRoles();  
  }

  getUsersWithRoles(){
    this.adminService.getUserWithRoles().subscribe({
      next: users=> {
        this.users = users;
        console.log(users);
      }
    })
  }
}
