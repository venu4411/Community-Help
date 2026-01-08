import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-helper-requests',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './helper-requests.component.html',
  styleUrls: ['./helper-requests.component.css']
})
export class HelperRequestsComponent implements OnInit {

  tasks: any[] = [];
  user: any;

  // store pin digits per task
  pinMap: { [taskId: number]: string[] } = {};

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();

    // 🔒 Only helpers allowed
    if (this.user?.role?.toLowerCase() !== 'helper') {
      this.router.navigate(['/']);
      return;
    }

    this.loadTasks();
  }

  loadTasks(): void {
    this.auth.getHelperTasks(this.user.username).subscribe({
      next: (data: any[]) => {
        this.tasks = data;
      },
      error: err => console.error('LOAD TASK ERROR', err)
    });
  }

  acceptTask(id: number): void {
    this.auth.acceptTask(id, this.user.username).subscribe({
      next: () => this.loadTasks(),
      error: err => console.error('ACCEPT TASK ERROR', err)
    });
  }

  /* ================= PIN INPUT ================= */
  onPinInput(event: any, index: number, task: any): void {
    const value = event.target.value;

    if (!/^[0-9]$/.test(value)) {
      event.target.value = '';
      return;
    }

    if (!this.pinMap[task.id]) {
      this.pinMap[task.id] = ['', '', '', ''];
    }

    this.pinMap[task.id][index] = value;
  }

  /* ================= VERIFY PIN ================= */
  verifyPin(task: any): void {
    const pinArr = this.pinMap[task.id];

    if (!pinArr || pinArr.some(d => d === '')) {
      alert('Please enter the full 4-digit PIN');
      return;
    }

    const pin = pinArr.join('');

    this.auth.verifyPin(task.id, pin).subscribe({
      next: () => {
        alert('PIN verified. Work started.');
        this.loadTasks();
      },
      error: () => {
        alert('Invalid PIN');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }
}
