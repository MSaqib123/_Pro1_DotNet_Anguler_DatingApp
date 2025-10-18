import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-member-detail',
  imports: [RouterLink,DatePipe,NgbNavModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  member?: Member;
  active = 1;

  
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => this.member = member
    });
  }
}
