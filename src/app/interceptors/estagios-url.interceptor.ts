import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';

export const API_REQUEST = new HttpContextToken<boolean>(() => false);

export const estagiosUrlInterceptor: HttpInterceptorFn = (req, next) => {

  if(req.context.get(API_REQUEST)) {
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
