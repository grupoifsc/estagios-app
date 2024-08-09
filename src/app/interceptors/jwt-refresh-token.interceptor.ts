import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../contexts/demo/auth.service';
import { inject } from '@angular/core';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';

export const jwtRefreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((err, caught) => {
      if (err.status === 401 && err.error && err.error.message === 'Token expired') {
        console.log("Token expired!");
        return authService.refreshToken().pipe( 
          switchMap(() => { 
            const updatedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${authService.getAuthToken()}`,
              },
            });
            return next(updatedRequest);
          }),
          catchError(() => {
            authService.logoutAndRedirect();
            throw new Error('Token refresh failed');
          })
        );
      }
      else return of();
    })
  )

};
