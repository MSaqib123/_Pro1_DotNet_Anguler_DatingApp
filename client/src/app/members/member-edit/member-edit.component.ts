import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { NotyfService } from '../../shared/notyif.service';
import { DatePipe } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox'; 
import { FormsModule, NgForm } from '@angular/forms';
import { PhotoEditorComponent } from "../photo-editor/photo-editor.component";
import { TimeagoModule } from 'ngx-timeago';


@Component({
  selector: 'app-member-edit',
  imports: [DatePipe, NgbNavModule, GalleryModule, LightboxModule, FormsModule, PhotoEditorComponent,TimeagoModule, DatePipe],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  //==== browser base functionality ====
  @HostListener('window:beforeunload',['$event']) notify($event:any) {
    if(this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  member?: Member;
  @ViewChild('editForm') editForm!: NgForm; 
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toaster = inject(NotyfService);
  active = 1;  

  ngOnInit(): void {
    this.loadMember();
  }

  private loadMember() {
    const user = this.accountService.currentUser();
    if (!user) return;

    this.memberService.getMember(user.username).subscribe({
      next: member => this.member = member,
      error: err => {
        console.error(err);
        this.toaster.error(err.message);
      }
    });
  }

  updateMember(){
    console.log(this.member)
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: () => {

        this.toaster.success("Profile updated successfully");
        this.editForm.reset(this.member);
      },
      error: err => {
        console.error(err);
        this.toaster.error(err.message);
      }
    });
  }


  onMemberChange(event:Member){
    this.member = event;
  }
}
