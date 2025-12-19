import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { MockRoleService } from '../services/mock-role.service';

export const HelperGuard: CanActivateFn = () => {
  return inject(MockRoleService).getRole() === 'helper'
    ? true
    : inject(Router).navigate(['/not-authorized']);
};
