import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { API_REQUEST } from './contexts';
import { config } from '../config';
import { inject } from '@angular/core';
import { ApiUrlService } from '../api-url.service';

export const estagiosUrlInterceptor: HttpInterceptorFn = (req, next) => {

  // const apiUrlService = inject(ApiUrlService);
  // let url : string = '';

  if(req.context.get(API_REQUEST) && !req.url.endsWith('.md')) {
    // apiUrlService.apiUrl.subscribe({
    //   next: value => url = value.url
    // })
  
    const estagiosApiBaseUrl = config.apiUrl + "/api/v1"

    const apiRequest = req.clone({
      url: `${estagiosApiBaseUrl}${req.url}`
    })
    
    return next(apiRequest);
  } 
  
  else 
    return next(req);


};
