import { HttpInterceptorFn } from '@angular/common/http';
import { API_REQUEST } from './contexts';
import { config } from '../config';

export const estagiosUrlInterceptor: HttpInterceptorFn = (req, next) => {

  if(req.context.get(API_REQUEST) && !req.url.endsWith('.md')) {
   
    const estagiosApiBaseUrl = config.apiUrl + "/api/v1"

    const apiRequest = req.clone({
      url: `${estagiosApiBaseUrl}${req.url}`
    })
    
    return next(apiRequest);
  } 
  
  else 
    return next(req);


};
