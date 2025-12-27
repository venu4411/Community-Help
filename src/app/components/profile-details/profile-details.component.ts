import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';   // ✅ REQUIRED
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  user: any;
  editMode = false;
  showPassword = false;
  successMessage = '';

  // ✅ Router MUST be injected
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser();
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    this.successMessage = '';
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  save() {
    const payload: any = {
      fullName: this.user.fullName,
      username: this.user.username,
      contact: this.user.contact,
      location: this.user.location,
      password: this.user.password
    };

    if (this.user.role === 'Helper') {
      payload.price = this.user.price;
    }

    this.auth.updateUser(this.user.id, this.user.role, payload)
      .subscribe({
        next: (res: any) => {
          this.successMessage = 'Successfully updated';
          this.editMode = false;
          this.auth.setUser(this.user);
        },
        error: () => {
          this.successMessage = 'Update failed';
        }
      });
  }

  // ✅ THIS IS YOUR LINE 62 — NOW IT WORKS
  goBack() {
    this.router.navigate(['/']);
  }
}
