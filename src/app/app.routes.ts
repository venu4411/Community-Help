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
import { TaskTrackingComponent } from './components/task-tracking/task-tracking.component';
import { PaymentTaskTrackingComponent } from './components/payment-task-tracking/payment-task-tracking.component';
import { AdminBookingsComponent } from './components/admin-bookings/admin-bookings.component';
import { HelperRequestsComponent } from './components/helper-requests/helper-requests.component';
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ChatComponent } from './components/chat/chat.component';

/* ================= ADMIN ================= */
import { AdminComponent } from './components/admin/admin.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminHelpersComponent } from './components/admin-helpers/admin-helpers.component';

export const routes: Routes = [

  /* ================= PUBLIC ================= */
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'helper-login', component: HelperLoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'helper-registration', component: HelperRegistrationComponent },

  /* ================= USER / HELPER ================= */
  { path: 'profile', component: ProfileDetailsComponent },
  { path: 'book-help', component: BookHelpComponent },
  { path: 'book-work/:type', component: BookWorkComponent },
  { path: 'book-now', component: BookNowComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'tracking', component: TaskTrackingComponent },
  { path: 'payment-task-tracking', component: PaymentTaskTrackingComponent },


  { path: 'helper/requests', component: HelperRequestsComponent },
  { path: 'tracking', component: UserTasksComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'chat', component: ChatComponent },

  /* ================= ADMIN ================= */
  { path: 'admin', component: AdminComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'admin/helpers', component: AdminHelpersComponent },
  { path: 'admin/bookings', component: AdminBookingsComponent},

  /* ================= FALLBACK ================= */
  { path: '**', redirectTo: '' }
];
