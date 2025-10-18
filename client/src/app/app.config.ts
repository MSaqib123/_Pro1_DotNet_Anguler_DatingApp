import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { errorInterceptor } from './_interceptors/error.interceptor'; // This path must be correct
import { jwtInterceptor } from './_interceptors/jwt.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor,jwtInterceptor])),
  ],
};
