import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  HostListener
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements AfterViewInit {

  activeSection = '';
  isScrolled = false;
  mobileMenuOpen = false;

  benefits: string[] = [
    'Simple Requests',
    'Nearby Helpers',
    'Status Tracking',
    'Secure Platform',
    'Fast Communication',
    'Community Driven'
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      // ✅ FIX: observe ALL reveal elements
      const reveals = document.querySelectorAll('.reveal');

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.2 }
      );

      reveals.forEach(el => observer.observe(el));
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  popularHelpers = [
  {
    name: 'Arjun Rao',
    role: 'Electrician',
    rating: 4.8,
    image: 'https://i.pravatar.cc/150?img=32'
  },
  {
    name: 'Sneha Patel',
    role: 'Home Tutor',
    rating: 4.9,
    image: 'https://i.pravatar.cc/150?img=12'
  },
  {
    name: 'Mohammed Irfan',
    role: 'Plumber',
    rating: 4.7,
    image: 'https://i.pravatar.cc/150?img=48'
  }
];


}
