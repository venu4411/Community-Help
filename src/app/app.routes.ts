import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { HelperLoginComponent } from './components/helper-login/helper-login.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HelperRegistrationComponent } from './components/helper-registration/helper-registration.component';
import { BookHelpComponent } from './components/book-help/book-help.component';
import { BookWorkComponent } from './components/book-work/book-work.component';
import { BookNowComponent } from './components/book-now/book-now.component';
import { PaymentComponent } from './components/payment/payment.component';
import { TrackingComponent } from './components/tracking/tracking.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'helper-login', component: HelperLoginComponent },
  { path: 'profile', component: ProfileDetailsComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'helper-registration', component: HelperRegistrationComponent },
  { path: 'book-help', component: BookHelpComponent },
  { path: 'book-work/:type', component: BookWorkComponent },
  { path: 'book-now', component: BookNowComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'tracking', component: TrackingComponent },



  
];
