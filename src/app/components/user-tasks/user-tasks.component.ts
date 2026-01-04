import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-tasks.component.html'
})
export class UserTasksComponent implements OnInit {

  tasks: any[] = [];
  user: any;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();

    if (this.user?.role === 'Resident') {
      this.auth.getUserTasks(this.user.username)
        .subscribe(data => this.tasks = data);
    }
  }
}
