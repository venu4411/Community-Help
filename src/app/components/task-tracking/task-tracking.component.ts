import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
      this.router.navigate(['/login']);
      return;
    }

    this.role = (this.user.role || '').toLowerCase() === 'helper'
      ? 'helper'
      : 'user';

    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;

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
        error: () => {
          this.loading = false;
          alert('Failed to load tasks');
        }
      });
    }

    if (this.role === 'helper') {
      this.http.get<any[]>(
        `http://localhost:3000/api/task/helper/${this.user.fullName}`
      ).subscribe({
        next: res => {
          this.tasks = res;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert('Failed to load helper tasks');
        }
      });
    }
  }

  formatDate(date: string): string {
    return date ? new Date(date).toLocaleDateString('en-IN') : '-';
  }

  completeTask(task: any): void {
    this.http.post(
      'http://localhost:3000/api/task/complete',
      { paymentId: task.id }
    ).subscribe(() => {
      task.task_status = 'completed';
    });
  }

  setRating(task: any, rating: number): void {
    if (!task.submitted) task.userRating = rating;
  }

  submitReview(task: any): void {
    if (!task.userRating) return;

    this.http.post(
      'http://localhost:3000/api/rate-helper',
      {
        helpername: task.helpername,
        rating: task.userRating,
        review: task.userReview
      }
    ).subscribe(() => {
      task.submitted = true;
    });
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }
}
