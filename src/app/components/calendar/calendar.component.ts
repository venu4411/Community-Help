import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  schedules: any[] = [];
  loading = true;

  user: any;
  role: 'user' | 'helper' = 'user';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();

    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.role =
      this.user.role?.toLowerCase() === 'helper'
        ? 'helper'
        : 'user';

    this.loadCalendar();
  }

  loadCalendar(): void {
    const username = this.user.username; // ✅ IMPORTANT

    this.auth.getCalendar(this.role, username).subscribe({
      next: data => {
        this.schedules = data;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }


  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-IN');
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }
}
