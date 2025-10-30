import { Component, inject, ViewChild } from '@angular/core';
import { NgbNav, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../_services/message.service';
import { MembersService } from '../../_services/members.service';
import { Message } from '../../_models/message';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { GalleryItem } from 'ng-gallery';
import { HasRoleDirective } from '../../_directives/has-role.directive';
import { UserManagementComponent } from "../user-management/user-management.component";
import { PhotoManagementComponent } from '../photo-management/photo-management.component';


@Component({
  selector: 'app-admin-penal',
  imports: [NgbNavModule, HasRoleDirective, UserManagementComponent, PhotoManagementComponent],
  templateUrl: './admin-penal.component.html',
  styleUrl: './admin-penal.component.css'
})
export class AdminPenalComponent {
  @ViewChild('nav', { static: true }) navTabs?: NgbNav;
  private messageService = inject(MessageService);
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  messagesList:Message[] =[];
  member: Member = {} as Member;
  images: GalleryItem[] = []; 
  active = 1;
}
