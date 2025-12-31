import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-tracking.component.html',
  styleUrls: ['./task-tracking.component.css']
})
export class TaskTrackingComponent implements OnInit {

  tasks: any[] = [];
  loading = true;
  user: any;
  role: 'user' | 'helper' = 'user';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();

    if (!this.user) {
      alert('Login required');
      this.router.navigate(['/login']);
      return;
    }

    // normalize role
    const role = (this.user.role || '').toLowerCase();
    this.role = role === 'helper' ? 'helper' : 'user';

    this.loadTasks();
  }

  /* ================= LOAD TASKS ================= */
  loadTasks() {
    this.loading = true;

    // -------- USER TASKS --------
    if (this.role === 'user') {
      this.http.get<any[]>(
        `http://localhost:3000/api/task/user/${this.user.username}`
      ).subscribe({
        next: res => {
          this.tasks = res.map(t => ({
            ...t,
            userRating: t.rating || 0,
            userReview: t.review || '',
            submitted: !!t.rating
          }));
          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.loading = false;
          alert('Failed to load user tasks');
        }
      });
    }

    // -------- HELPER TASKS --------
    if (this.role === 'helper') {
      this.http.get<any[]>(
        `http://localhost:3000/api/task/helper/${this.user.fullName}`
      ).subscribe({
        next: res => {
          this.tasks = res;
          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.loading = false;
          alert('Failed to load helper tasks');
        }
      });
    }
  }

  /* ================= FORMAT DATE ================= */
  formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-IN');
  }

  /* ================= COMPLETE TASK (USER ONLY) ================= */
  completeTask(task: any) {
    if (this.role !== 'user') return;

    this.http.post(
      'http://localhost:3000/api/task/complete',
      { paymentId: task.id }
    ).subscribe({
      next: () => {
        task.task_status = 'completed';
      },
      error: err => {
        console.error(err);
        alert('Failed to complete task');
      }
    });
  }

  /* ================= STAR RATING ================= */
  rate(task: any, star: number) {
    if (task.submitted) return;
    task.userRating = star;
  }

  /* ================= SUBMIT REVIEW ================= */
  submitReview(task: any) {
    if (task.submitted || this.role !== 'user') return;

    if (!task.userRating) {
      alert('Please select rating');
      return;
    }

    this.http.post(
      'http://localhost:3000/api/rate-helper',
      {
        helpername: task.helpername,
        rating: task.userRating,
        review: task.userReview
      }
    ).subscribe({
      next: () => {
        task.submitted = true;
        alert('Review submitted');
      },
      error: err => {
        console.error(err);
        alert('Failed to submit review');
      }
    });
  }

  /* ================= NAVIGATION ================= */
  goBack() {
    this.router.navigate(['/profile']);
  }
}
