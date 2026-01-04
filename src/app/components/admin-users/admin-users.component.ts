import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: any[] = [];
  selectedUser: any = null;
  showEdit = false;
  message = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.auth.getAllUsers().subscribe(res => {
      this.users = res;
    });
  }

  editUser(user: any) {
    this.selectedUser = { ...user };
    this.showEdit = true;
  }

saveChanges() {
    if (!this.selectedUser?.id) {
        alert('User ID missing');
        return;
    }

    if (!this.selectedUser.full_name || !this.selectedUser.username) {
        alert('Full Name and Username are required');
        return;
    }

    this.auth.updateUserByAdmin(
        this.selectedUser.id,
        this.selectedUser
    ).subscribe({
        next: (res: any) => {
        this.message = res.message;
        this.showEdit = false;
        this.loadUsers();
        setTimeout(() => this.message = '', 3000);
        },
        error: err => {
        console.error(err);
        alert('❌ Update failed (check backend log)');
        }
    });
}


  cancel() {
    this.showEdit = false;
  }

  goBack() {
    this.router.navigate(['/admin']);
  }
}
