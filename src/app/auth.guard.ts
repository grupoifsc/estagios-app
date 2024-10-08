import { CanActivateFn } from '@angular/router';
import { AuthService } from './contexts/demo/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log("You are authenticated!");
    console.log("Access Token: " + authService.getAuthToken());  
    return true;
  }
  else {
    sleep(3000).then(() => {
      router.navigate(['/demo/login'], { queryParams: { goTo: state.url }});
    })
    return false;  
  }


};
