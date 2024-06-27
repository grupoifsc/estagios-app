import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  let loading = inject(LoadingService);
  loading.showLoading();
  
  return next(req).pipe(
    finalize(() => loading.hideLoading())
  );

};
