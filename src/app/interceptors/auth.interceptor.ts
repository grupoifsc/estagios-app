import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../contexts/demo/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = inject(AuthService).getAuthToken();    

  if(accessToken) {
    let request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
    });
    return next(request);
  }

  return next(req);

};
