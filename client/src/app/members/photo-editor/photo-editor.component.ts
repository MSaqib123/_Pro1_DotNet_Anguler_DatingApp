import { Component, inject, input, OnInit, output } from '@angular/core';
import { Member } from '../../_models/member';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { AccountService } from '../../_services/account.service';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-photo-editor',
  imports: [NgIf,NgFor, NgStyle, NgClass, FileUploadModule, DecimalPipe],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit {
  private accountService = inject(AccountService);
  member = input.required<Member>();
  uploader?: FileUploader;
  hasBaseDropZoneOver?:boolean;
  baseUrl = environment.apiUrl;
  memberChange = output<Member>()

  hasAnotherDropZoneOver?:boolean;
  response?:string;

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropZoneOver = e;
  }


  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5:true,
      allowedFileType: ['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize : 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials =false
    }

    this.uploader.onSuccessItem = (item,response, status,headers) => {
      const photo = JSON.parse(response);
      const updatedMember = {...this.member()}
      updatedMember.photos.push(photo);
      this.memberChange.emit(updatedMember);
    }
  }
  
}
