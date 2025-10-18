import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class NotyfService {
  private notyf: Notyf;

  constructor() {
    this.notyf = new Notyf({
      duration: 10000,
      position: { x: 'right', y: 'bottom' },
      dismissible: true,
      types: [
        {
          type: 'success',
          background: '#28a745',
          icon: {
            className: 'notyf__icon--success',
            tagName: 'i',
            text: '',
          },
        },
        {
          type: 'error',
          background: '#dc3545',
          icon: {
            className: 'notyf__icon--error',
            tagName: 'i',
            text: '',
          },
        },
        {
          type: 'info',
          background: '#17a2b8',
          icon: {
            className: 'notyf__icon--info',
            tagName: 'i',
            text: '',
          },
        },
      ],
    });
  }

  success(title: string, message?: string) {
  this.notyf.success({
    message: `<strong>${title}</strong>${message ? '<br>' + message : ''}`,
    duration: 4000,
    dismissible: true
  });
}

error(title: string, message?: string) {
  this.notyf.error({
    message: `<strong>${title}</strong>${message ? '<br>' + message : ''}`,
    duration: 4000,
    dismissible: true
  });
}

info(title: string, message?: string) {
  this.notyf.open({
    type: 'info',
    message: `<strong>${title}</strong>${message ? '<br>' + message : ''}`,
    duration: 4000,
    dismissible: true
  });
}

}