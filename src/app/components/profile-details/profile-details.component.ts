import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-profile-details',
  imports: [CommonModule],
  templateUrl: './profile-details.component.html'
})
export class ProfileDetailsComponent implements OnInit {

  user: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    console.log('PROFILE USER OBJECT 👉', this.user);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
