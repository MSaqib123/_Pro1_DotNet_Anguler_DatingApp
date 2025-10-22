import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { AccountService } from './account.service';
import { of, tap } from 'rxjs';
import { Photo } from '../_models/photo';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  baseUrl = environment.apiUrl;
  //members = signal<Member[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);

  getMembers(pageNumber?:number, PageSize?: number){
    let params = new HttpParams();
    if(pageNumber && PageSize){
      params = params.append('pageNumber',pageNumber);
      params = params.append('pageSize',PageSize);
    }
    return this.http.get<Member[]>(this.baseUrl + 'users',{observe:'response',params}).subscribe({
      next: response => {
        this.paginatedResult.set({
          items:response.body as Member[],
          pagination:JSON.parse(response.headers.get('Pagination')!)
        });
      }
    });
  }

  getMember(username: string){
    // const member = this.members().find(x=>x.userName===username);
    // if(member != undefined) return of(member)
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member:Member){
    return this.http.put(this.baseUrl + 'users', member)
    // .pipe(
    //   tap(()=>{
    //     this.members.update(members => members.map(m=>m.userName === member.userName ? member : m))
    //   })
    // );
  }


  setMainPhoto(photo:Photo){
    return this.http.put(this.baseUrl + 'users/set-main-photo/'+ photo.id,{})
    // .pipe(
    //   tap(()=>{
    //     this.members.update(members => members.map(m=>{
    //       if(m.photos.includes(photo)){
    //         m.photoUrl = photo.url
    //       }
    //       return m;
    //     }))
    //   })
    // )
  }


  deletePhoto(photo:Photo){
    return this.http.delete(this.baseUrl + 'user/delete -photo/'+photo.id)
    //   .pipe(
    //   tap(()=>{
    //     this.members.update(members => members.map(m=>{
    //       if(m.photos.includes(photo)){
    //         m.photos = m.photos.filter(x=>x.id === photo.id)
    //       }
    //       return m;
    //     }))
    //   })
    // )
  }
}




// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable, signal } from '@angular/core';
// import { environment } from '../../environments/environment';
// import { Member } from '../_models/member';
// import { AccountService } from './account.service';
// import { of, tap } from 'rxjs';
// import { Photo } from '../_models/photo';

// @Injectable({
//   providedIn: 'root'
// })
// export class MembersService {
//   private http = inject(HttpClient);
//   private accountService = inject(AccountService);
//   baseUrl = environment.apiUrl;
//   members = signal<Member[]>([]);

//   getMembers(){
//     return this.http.get<Member[]>(this.baseUrl + 'users').subscribe({
//       next: m => this.members.set(m)
//     });
//   }

//   getMember(username: string){
//     const member = this.members().find(x=>x.userName===username);
//     if(member != undefined) return of(member)
//     return this.http.get<Member>(this.baseUrl + 'users/' + username);
//   }

//   updateMember(member:Member){
//     return this.http.put(this.baseUrl + 'users', member).pipe(
//       tap(()=>{
//         this.members.update(members => members.map(m=>m.userName === member.userName ? member : m))
//       })
//     );
//   }


//   setMainPhoto(photo:Photo){
//     return this.http.put(this.baseUrl + 'users/set-main-photo/'+ photo.id,{}).pipe(
//       tap(()=>{
//         this.members.update(members => members.map(m=>{
//           if(m.photos.includes(photo)){
//             m.photoUrl = photo.url
//           }
//           return m;
//         }))
//       })
//     )
//   }


//   deletePhoto(photo:Photo){
//     return this.http.delete(this.baseUrl + 'user/delete -photo/'+photo.id).pipe(
//       tap(()=>{
//         this.members.update(members => members.map(m=>{
//           if(m.photos.includes(photo)){
//             m.photos = m.photos.filter(x=>x.id === photo.id)
//           }
//           return m;
//         }))
//       })
//     )
//   }
// }
