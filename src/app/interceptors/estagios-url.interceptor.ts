import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { API_REQUEST } from './contexts';

export const estagiosUrlInterceptor: HttpInterceptorFn = (req, next) => {

  if(req.context.get(API_REQUEST) && !req.url.endsWith('.md')) {
    console.log("ENTREI NO URL INTERCEPTOR");
    
    const estagiosApiBaseUrl = "http://localhost:8080/api/v1"

    const apiRequest = req.clone({
      url: `${estagiosApiBaseUrl}${req.url}`
    })
    
    return next(apiRequest);
  } 
  
  else 
    return next(req);


};
