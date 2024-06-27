import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((error, caught) => {
      console.log(error.error);
      throw new Error(error.error.message ?? error.error)
    })
  )
};
