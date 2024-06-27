import { HttpInterceptorFn } from '@angular/common/http';
import { retry} from 'rxjs';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  
  const maxRetries : number = 2;
  
  return next(req).pipe(
    retry(maxRetries)
  )

};
