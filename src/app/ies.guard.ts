import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './contexts/demo/auth.service';
import { MessageService } from 'primeng/api';

export const iesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // const messageService = inject(MessageService)

  if(authService.isIe())
    return true;

  console.log("Only IEs can access moderation page");
  // messageService.add({
  //   key: 'demo-main',
  //   detail: 'Apenas IEs podem acessar esta página',
  //   severity: 'warning'
  // })
  router.navigate(['/demo/vagas/criadas']);
  return false;

};
