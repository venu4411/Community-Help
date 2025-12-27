import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-now',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.css']
})
export class BookNowComponent {

  helper: any;
  today!: string;

  booking = {
    date: '',
    time: '',
    location: ''
  };

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.helper = nav?.extras?.state?.['helper'];

    if (!this.helper) {
      alert('Invalid booking session');
      this.router.navigate(['/']);
    }

    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  getProfileImage(): string {
    return this.helper?.gender?.toLowerCase() === 'female'
      ? 'https://t4.ftcdn.net/jpg/08/23/95/89/360_F_823958944_1c9covIC7Tl7eyJtWoTiXc0L4vP6f43q.jpg'
      : 'https://img.freepik.com/premium-photo/funny-3d-avatar-man-suit-professional-lawyer-office-worker_1270124-12567.jpg';
  }

  continueToPayment(): void {
    if (!this.booking.date || !this.booking.time || !this.booking.location) {
      alert('Please fill all booking details');
      return;
    }

    this.router.navigate(['/payment'], {
      state: {
        helper: this.helper,
        booking: this.booking
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/book-work', this.helper.helpType]);
  }
}
