/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, {
//   providers: [
    
//     provideHttpClient(),
//     provideRouter(routes),
    
//   ]
// }).catch(err => console.error(err));



bootstrapApplication(AppComponent,appConfig)
  .catch((err) => console.error(err));