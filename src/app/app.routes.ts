import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },

  { path: 'register', component: RegistrationComponent },

  {
    path: 'helper-registration',
    loadComponent: () =>
      import('./components/helper-registration/helper-registration.component')
        .then(m => m.HelperRegistrationComponent)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component')
        .then(m => m.LoginComponent)
  },

  { path: '**', redirectTo: '' },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/details', component: ProfileDetailsComponent }
];
