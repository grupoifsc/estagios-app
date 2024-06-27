import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const requestTimingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();
  return next(req).pipe(
    tap(() => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      console.log(`Request to ${req.url} took ${duration}ms`);
  }))
  
};
