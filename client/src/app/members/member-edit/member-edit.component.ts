import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { NotyfService } from '../../shared/notyif.service';

@Component({
  selector: 'app-member-edit',
  imports: [],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  member?: Member;
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toaster = inject(NotyfService);

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
}
