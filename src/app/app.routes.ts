import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HelperRegistrationComponent } from './components/helper-registration/helper-registration.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'helper-registration', component: HelperRegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileDetailsComponent }
];
