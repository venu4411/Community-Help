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
      next: data => this.tasks = data,
      error: err => console.error(err)
    });
  }

  acceptTask(id: number): void {
    this.auth.acceptTask(id, this.user.username).subscribe(() => {
      this.loadTasks(); // reload to reflect new order + status
    });
  }


  goBack(): void {
    this.router.navigate(['/profile']);
  }
}
