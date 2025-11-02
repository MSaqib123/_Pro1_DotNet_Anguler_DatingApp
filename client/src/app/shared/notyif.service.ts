import { Injectable } from '@angular/core';
import { Notyf, NotyfEvent, NotyfNotification } from 'notyf';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class NotyfService {
  private notyf = new Notyf({
    duration: 10000,
    position: { x: 'right', y: 'bottom' },
    dismissible: true,
    types: [
      { type: 'success', background: '#28a745', icon: { className: 'notyf__icon--success', tagName: 'i' } },
      { type: 'error',   background: '#dc3545', icon: { className: 'notyf__icon--error', tagName: 'i' } },
      { type: 'info',    background: '#17a2b8', icon: { className: 'notyf__icon--info', tagName: 'i' } },
      { type: 'warning', background: '#ffc107', icon: { className: 'fas fa-trash', tagName: 'i', color: '#212529' } },
  //     {
  //   type: 'success',
  //   background: '#28a745',
  //   icon: {
  //     className: 'fas fa-check-circle',
  //     tagName: 'i',
  //   },
  // },
  // {
  //   type: 'error',
  //   background: '#dc3545',
  //   icon: {
  //     className: 'fa fa-times',
  //     tagName: 'i',
  //   },
  // },
  // {
  //   type: 'info',
  //   background: '#17a2b8',
  //   icon: {
  //     className: 'fa fa-info',
  //     tagName: 'i',
  //   },
  // },
  // {
  //   type: 'warning',
  //   background: '#ffc107',
  //   icon: {
  //     className: 'fa fa-exclamation',
  //     tagName: 'i',
  //     color: '#212529',
  //   },
  // },
      
    ],
  });

  private showNotification(
    type: 'success' | 'error' | 'info' | 'warning',
    title: string,
    message?: string
  ): NotyfNotification | void {
    const html = message === undefined
      ? title
      : `<strong>${title}</strong>${message ? '<br>' + message : ''}`;
    const config = { message: html, duration: 4000, dismissible: true };
    if (type === 'success') return this.notyf.success(config);
    if (type === 'error') return this.notyf.error(config);
    return this.notyf.open({ ...config, type });
  }

  success(title: string, message?: string): void {
    this.showNotification('success', title, message);
  }

  error(title: string, message?: string): void {
    this.showNotification('error', title, message);
  }

  info(title: string, message?: string): NotyfNotification {
    return this.showNotification('info', title, message) as NotyfNotification;
  }

  warning(title: string, message?: string): NotyfNotification {
    return this.showNotification('warning', title, message) as NotyfNotification;
  }
  
}