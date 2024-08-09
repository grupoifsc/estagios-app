import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../contexts/demo/auth.service';
import { NEED_AUTH } from './contexts';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  if(req.context.get(NEED_AUTH)) {
    const accessToken = inject(AuthService).getAuthToken();    
    if(accessToken) {
      let request = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
      });
      return next(request);
    }
  }

  return next(req);

};
