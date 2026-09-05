import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const accessToken = localStorage.getItem('access_token');
  const router = inject(Router);
  if (!accessToken) {
    router.navigate(['/auth']);
    return false;
  }
  return true;
};
