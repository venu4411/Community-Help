import { Routes } from '@angular/router';
import { DashboardResidentComponent } from '../../components/dashboard-resident/dashboard-resident.component';
import { HelpRequestComponent } from '../../components/help-request/help-request.component';
import { ResidentGuard } from '../../guards/resident.guard';

export const RESIDENT_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardResidentComponent,
    canActivate: [ResidentGuard]
  },
  {
    path: 'requests/new',
    component: HelpRequestComponent,
    canActivate: [ResidentGuard]
  }
];
