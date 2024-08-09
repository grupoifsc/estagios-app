import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './contexts/demo/auth.service';

export const iesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isIe())
    return true;

  console.log("Only IEs can access moderation page");
  router.navigate(['/demo/dashboard']);
  return false;

};
