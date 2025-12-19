import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MockRoleService {
  role = signal<'resident' | 'helper' | 'admin'>('resident');

  setRole(role: any) {
    this.role.set(role);
  }

  getRole() {
    return this.role();
  }
}
