import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-admin-bookings',
  imports: [CommonModule],
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent implements OnInit {

  bookings: any[] = [];
  loading = true;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.getAllBookings().subscribe({
      next: res => {
        this.bookings = res;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin']);
  }
}
