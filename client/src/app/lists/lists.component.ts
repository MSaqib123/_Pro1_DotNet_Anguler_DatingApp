import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LikesService } from '../_services/likes.service';
import { Member } from '../_models/member';
import { MemberCardComponent } from "../members/member-card/member-card.component";
import { FormsModule } from '@angular/forms';
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-lists',
  imports: [MemberCardComponent, FormsModule, NgbPagination],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit, OnDestroy {
  likesService = inject(LikesService);
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadLikes();
  }
  
  getTitle(){
    switch(this.predicate){
      case 'liked':return 'Members you like';
      case 'likedBy': return 'Members who like you';
      default: return 'Mutuel'
    }
  }

  loadLikes(){
    this.likesService.getLikes(this.predicate,this.pageNumber,this.pageSize);
  }


  pageChanged(page:number){    
    console.log(page)
    if(this.pageNumber !== page){
      this.pageNumber = page;
      this.loadLikes();
    }



    // if(this.memberService.userParams().pageNumber !== page)
    // {
    //   this.memberService.userParams().pageNumber = page;
    //   this.loadMembers();
    // }

    
  }

  ngOnDestroy(): void {
    this.likesService.paginatedResult.set(null);
  }

}
