import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const debugInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`Debug Interceptor: Request to ${req.url}`);
  // Bypass for Account/register to test raw error handling
  if (req.url.includes('Account/register')) {
    console.log('Debug Interceptor: Bypassing Account/register');
    return next(req);
  }
  return next(req).pipe(
    catchError(error => {
      console.log('Debug Interceptor: Error caught:', error);
      alert(`Error ${error.status}: ${error.message || 'Unknown error'}`);
      return throwError(() => error);
    })
  );
};