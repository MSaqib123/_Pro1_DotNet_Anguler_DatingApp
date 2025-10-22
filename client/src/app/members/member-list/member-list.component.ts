import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { MemberCardComponent } from "../member-card/member-card.component";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent,NgbPaginationModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  memberService = inject(MembersService);
  pageNumber = 1;
  pageSize = 5;
  ngOnInit(): void {
    // if(this.memberService.members().length===0) this.loadMembers();
    if(!this.memberService.paginatedResult()) this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers(this.pageNumber,this.pageSize);
  }



  pageChanged(page:number){    
    console.log(page)
    if(this.pageNumber !== page)
    {
      this.pageNumber = page;
      this.loadMembers();
    }

    
  }

}
