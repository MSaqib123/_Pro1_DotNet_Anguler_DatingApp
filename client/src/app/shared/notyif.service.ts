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
            className: 'fa fa-check-circle',   // FA 4.7 success
            tagName: 'i',
          },
        },
        {
          type: 'error',
          background: '#dc3545',
          icon: {
            className: 'fa fa-times-circle',   // FA 4.7 error (you already had this)
            tagName: 'i',
          },
        },
        {
          type: 'info',
          background: '#17a2b8',
          icon: {
            className: 'fa fa-info-circle',    // FA 4.7 info
            tagName: 'i',
          },
        },
        {
          type: 'warning',
          background: '#ffc107',
          icon: {
            className: 'fa fa-trash', // FA 4.7 warning
            tagName: 'i',
            color: '#212529',
          },
        },
      ],
    });
  }

  /** -----------------------------------------------------------------
   *  Private helper – uses shortcut for built-in types, .open() for custom
   *  ----------------------------------------------------------------- */
  private showNotification(
    type: 'success' | 'error' | 'info' | 'warning',
    title: string,
    message?: string
  ) {
    const html = message === undefined
      ? title
      : `<strong>${title}</strong>${message ? '<br>' + message : ''}`;

    const baseConfig = {
      message: html,
      duration: 4000,
      dismissible: true,
    };

    // Built-in shortcuts (success / error) – they automatically pick the icon
    if (type === 'success') {
      this.notyf.success({ ...baseConfig });
      return;
    }
    if (type === 'error') {
      this.notyf.error({ ...baseConfig });
      return;
    }

    // Custom types → use .open()
    this.notyf.open({ ...baseConfig, type });
  }

  // -----------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------
  success(title: string, message?: string) {
    this.showNotification('success', title, message);
  }

  error(title: string, message?: string) {
    this.showNotification('error', title, message);
  }

  info(title: string, message?: string) {
    this.showNotification('info', title, message);
  }

  warning(title: string, message?: string) {
    this.showNotification('warning', title, message);
  }

  // success(title: string, message?: string) {
  //   if (message === undefined) {
  //     this.notyf.success({
  //       message: `${title}`,
  //       duration: 4000,
  //       dismissible: true,
  //     });
  //   } else {
  //     this.notyf.success({
  //       message: `<strong>${title}</strong>${message ? '<br>' + message : ''}`,
  //       duration: 4000,
  //       dismissible: true,
  //     });
  //   }
  // }

  // error(title: string, message?: string) {
  //   if (message === undefined) {
  //     this.notyf.error({
  //       message: `${title}`,
  //       duration: 4000,
  //       dismissible: true,
  //     });
  //   } else {
  //     this.notyf.error({
  //       message: `<strong>${title}</strong>${message ? '<br>' + message : ''}`,
  //       duration: 4000,
  //       dismissible: true,
  //     });
  //   }
  // }

  // info(title: string, message?: string) {
  //   if (message === undefined) {
  //     this.notyf.open({
  //       type: 'info',
  //       message: `${title}`,
  //       duration: 4000,
  //       dismissible: true,
  //     });
  //   } else {
  //     this.notyf.open({
  //       type: 'info',
  //       message: `<strong>${title}</strong>${message ? '<br>' + message : ''}`,
  //       duration: 4000,
  //       dismissible: true,
  //     });
  //   }
  // }
}
