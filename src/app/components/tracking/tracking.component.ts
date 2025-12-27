import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  helper: any;
  booking: any;

  progress = 0;
  status = 'Helper assigned';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.helper = nav?.extras?.state?.['helper'];
    this.booking = nav?.extras?.state?.['booking'];

    if (!this.helper || !this.booking) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.startTracking();
  }

  startTracking() {
    const timer = setInterval(() => {
      this.progress += 10;

      if (this.progress === 30) this.status = 'Helper started';
      if (this.progress === 60) this.status = 'Helper nearby';
      if (this.progress === 100) {
        this.status = 'Helper arrived 🎉';
        clearInterval(timer);
      }
    }, 800);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
