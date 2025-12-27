import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-work.component.html',
  styleUrls: ['./book-work.component.css']
})
export class BookWorkComponent implements OnInit {

  helpType = '';
  helpers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.helpType = this.route.snapshot.paramMap.get('type') || '';
    this.loadHelpers();
  }

  loadHelpers(): void {
    this.authService.getHelpersByType(this.helpType).subscribe({
      next: data => this.helpers = data,
      error: err => console.error(err)
    });
  }

  bookHelper(helper: any): void {
    this.router.navigate(['/book-now'], {
      state: { helper }
    });
  }

  getImage(gender: string): string {
    return gender?.toLowerCase() === 'female'
      ? 'https://t4.ftcdn.net/jpg/08/23/95/89/360_F_823958944_1c9covIC7Tl7eyJtWoTiXc0L4vP6f43q.jpg'
      : 'https://img.freepik.com/premium-photo/funny-3d-avatar-man-suit-professional-lawyer-office-worker_1270124-12567.jpg';
  }

  goBack(): void {
    this.router.navigate(['/book-help']);
  }
}
