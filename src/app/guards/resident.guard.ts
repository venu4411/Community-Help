import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { MockRoleService } from '../services/mock-role.service';

export const ResidentGuard: CanActivateFn = () => {
  return inject(MockRoleService).getRole() === 'resident'
    ? true
    : inject(Router).navigate(['/not-authorized']);
};
