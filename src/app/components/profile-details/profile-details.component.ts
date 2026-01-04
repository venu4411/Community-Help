import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  user: any = null;
  editMode = false;
  showPassword = false;
  successMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();

    // Safety check
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    this.successMessage = '';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  save(): void {
    const payload: any = {
      fullName: this.user.fullName,
      username: this.user.username,
      contact: this.user.contact,
      location: this.user.location,
      password: this.user.password
    };

    // Helper-only field
    if (this.user.role === 'Helper') {
      payload.price = this.user.price;
    }

    this.auth.updateUser(this.user.id, this.user.role, payload).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully';
        this.editMode = false;

        // Update local storage
        this.auth.setUser(this.user);
      },
      error: () => {
        this.successMessage = 'Update failed. Try again.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
