import { Routes } from '@angular/router';
import { DashboardHelperComponent } from '../../components/dashboard-helper/dashboard-helper.component';
import { RequestListComponent } from '../../components/request-list/request-list.component';
import { HelperGuard } from '../../guards/helper.guard';

export const HELPER_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardHelperComponent,
    canActivate: [HelperGuard]
  },
  {
    path: 'requests',
    component: RequestListComponent,
    canActivate: [HelperGuard]
  }
];
