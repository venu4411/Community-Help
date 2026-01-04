import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private router: Router) {}

  viewUsers() {
    this.router.navigate(['/admin/users']);
  }

  viewHelpers() {
    this.router.navigate(['/admin/helpers']);
  }

  /* ✅ NEW */
  viewBookings() {
    this.router.navigate(['/admin/bookings']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
