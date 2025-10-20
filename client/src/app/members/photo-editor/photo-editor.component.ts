import { Component, inject, input } from '@angular/core';
import { Member } from '../../_models/member';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-photo-editor',
  imports: [NgIf,NgFor, NgStyle, NgClass],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent {
  private accountService = inject(AccountService);
  member = input.required<Member>();
  //uploader?: FileUploader;
}
