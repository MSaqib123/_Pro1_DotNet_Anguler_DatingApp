import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { MemberCardComponent } from "../member-card/member-card.component";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../_services/account.service';
import { UserParams } from '../../_models/userParams';


@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent,NgbPaginationModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  private accountService = inject(AccountService);
  memberService = inject(MembersService);
  userParams = new UserParams(this.accountService.currentUser());
  // pageNumber = 1;
  // pageSize = 5;

  ngOnInit(): void {
    // if(this.memberService.members().length===0) this.loadMembers();
    if(!this.memberService.paginatedResult()) this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers(this.userParams);
  }



  pageChanged(page:number){    
    console.log(page)
    if(this.userParams.pageNumber !== page)
    {
      this.userParams.pageNumber = page;
      this.loadMembers();
    }

    
  }

}
