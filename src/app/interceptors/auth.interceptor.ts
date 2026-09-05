import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const authService = inject(AuthService);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(

    catchError((error) => {

      if (error.status !== 401) {
        return throwError(() => error);
      }

      if (!refreshToken) {
        return throwError(() => error);
      }


      // Refresh the access token
      return authService.refreshToken(refreshToken).pipe(

        switchMap((res) => {

          // Save the new tokens
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);


          // Retry the original request with the new token
          const retryRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${res.access_token}`
            }
          });

          return next(retryRequest);
        }),

        // If refreshing itself fails
        catchError((refreshError) => {

          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');

          return throwError(() => refreshError);
        })
      );
    })
  );
};