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
    image: 'https://t3.ftcdn.net/jpg/04/64/91/64/360_F_464916429_9m2n531ScCfdAIpgAw5YOU3VFVbHOkSf.jpg'
  },
  {
    name: 'Sneha Patel',
    role: 'Home Tutor',
    rating: 4.9,
    image: 'https://img.freepik.com/free-photo/woman-holding-pile-clean-clothes_23-2149117036.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    name: 'Mohammed Irfan',
    role: 'Plumber',
    rating: 4.7,
    image: 'https://d17x34b9fcvxk7.cloudfront.net/static/marketing/images/hero-backgrounds/plumber.jpg'
  }
];
searchOpen = false;

toggleSearch(): void {
  this.searchOpen = !this.searchOpen;
}



}
