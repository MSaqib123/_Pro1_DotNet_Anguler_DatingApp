

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { NotyfService } from '../shared/notyif.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor triggered for request:', req.urlWithParams); // Debug log for all requests
  const router = inject(Router);
  const toastr = inject(NotyfService);
  return next(req).pipe(
    catchError(error => {
      console.log('Interceptor caught error:', error); // Debug log for errors
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modelStateErrors: string[] = []; // Explicitly typed as string[]
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modelStateErrors.push(error.error.errors[key]); // Spread to flatten arrays
                }
              }
              throw modelStateErrors.flat();
            } else {
              toastr.error(error.error);
            }
            break;
          case 401:
            toastr.error('Unauthorized');
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = { state: { error: error.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastr.error('Something unexpected went wrong');
            break;
        }
      }
      throw error;
    })
  );
};





/*
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NotyfService } from '../shared/notyif.service'; // Your notification service
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // 🛡️ STEP 1: Inject services we need
  const router = inject(Router);
  const toastr = inject(NotyfService);

  // 📡 STEP 2: Send request and CATCH any errors
  return next(req).pipe(
    catchError((error) => {
      console.log('🚨 ERROR CAUGHT:', error);
      
      // 🧠 STEP 3: Handle different error types
      handleError(error, router, toastr);
      
      // 🔄 STEP 4: Re-throw error for component to handle
      throw error;
    })
  );
};

// 🧩 STEP 3: Separate function for clean error handling
function handleError(error: any, router: Router, toastr: NotyfService) {
  if (!error.status) return; // No status? Ignore

  switch (error.status) {
    case 400: handleBadRequest(error, toastr); break;
    case 401: handleUnauthorized(toastr); break;
    case 404: handleNotFound(router); break;
    case 500: handleServerError(error, router); break;
    default: handleUnknownError(toastr); break;
  }
}

function handleBadRequest(error: any, toastr: NotyfService) {
  if (error.error?.errors) {
    // Form validation errors (like required fields)
    const messages = extractValidationErrors(error.error.errors);
    throw new Error(messages.join(', ')); // For component to show
  } else {
    toastr.error(error.error || 'Bad Request');
  }
}

function extractValidationErrors(errors: any): string[] {
  const messages: string[] = [];
  for (const key in errors) {
    if (errors[key]) {
      messages.push(...errors[key]); // Flatten arrays
    }
  }
  return messages;
}

function handleUnauthorized(toastr: NotyfService) {
  toastr.error('❌ Unauthorized - Please login again');
}

function handleNotFound(router: Router) {
  router.navigateByUrl('/not-found');
}

function handleServerError(error: any, router: Router) {
  const extras: NavigationExtras = { state: { error: error.error } };
  router.navigateByUrl('/server-error', extras);
}

function handleUnknownError(toastr: NotyfService) {
  toastr.error('😵 Something unexpected went wrong');
}


// 1. Angular sends HTTP request 👉 API
//    ↓
// 2. API responds with ERROR (400, 401, etc.)
//    ↓
// 3. Interceptor CATCHES error 🚨
//    ↓
// 4. Switch statement checks error.status
//    ↓
// 5. Takes ACTION based on status:
//    ┌─────────────┬──────────────────┬─────────────────┐
//    │ Status │ Action │ Example │
//    ├─────────────┼──────────────────┼─────────────────┤
//    │ 400 │ Show validation │ "Email required" │
//    │ 401 │ Show "Login" │ "Unauthorized" │
//    │ 404 │ Navigate │ /not-found │
//    │ 500 │ Navigate │ /server-error │
//    └─────────────┴──────────────────┴─────────────────┘
//    ↓
// 6. Re-throw error ➜ Component can handle too




*/
