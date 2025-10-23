import { Component, inject, OnInit } from '@angular/core';
import { LikesService } from '../_services/likes.service';
import { Member } from '../_models/member';
import { MemberCardComponent } from "../members/member-card/member-card.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lists',
  imports: [MemberCardComponent,FormsModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit {
  private likesService = inject(LikesService);
  members : Member[] = [];
  predicate = 'liked';

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
    this.likesService.getLikes(this.predicate).subscribe({
      next: members => this.members = members
    })
  }

}
