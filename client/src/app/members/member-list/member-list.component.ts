import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { MemberCardComponent } from "../member-card/member-card.component";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../_services/account.service';
import { UserParams } from '../../_models/userParams';
import { FormsModule } from '@angular/forms';
import { NgbNavLinkButton } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent,NgbPaginationModule,FormsModule,NgbNavLinkButton],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  //private accountService = inject(AccountService);
  memberService = inject(MembersService);
  // pageNumber = 1;
  // pageSize = 5;
  //userParams = new UserParams(this.accountService.currentUser());

  genderList= [{value:'male',display:'Males'},{value:'female', display:'Females'}]

  ngOnInit(): void {
    // if(this.memberService.members().length===0) this.loadMembers();
    if(!this.memberService.paginatedResult()) this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers();
  }

  resetFilter(){
    this.memberService.resetUserParams();
    this.loadMembers();
  }



  pageChanged(page:number){    
    console.log(page)
    if(this.memberService.userParams().pageNumber !== page)
    {
      this.memberService.userParams().pageNumber = page;
      this.loadMembers();
    }

    
  }

}
