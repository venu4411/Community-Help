import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { RegistrationComponent } from './components/registration/registration.component';

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

  { path: '**', redirectTo: '' }
];
