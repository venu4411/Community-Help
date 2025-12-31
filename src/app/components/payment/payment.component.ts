import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

type MainMethod = 'UPI' | 'Card' | 'Cash';
type UpiMethod = 'GPay' | 'PhonePe' | 'PayPal' | 'VISA';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  helper: any;
  booking: any;
  user: any;

  selectedMethod: MainMethod = 'UPI';
  selectedUpi: UpiMethod | null = null;

  showSuccess = false;

  card = {
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.helper = nav?.extras?.state?.['helper'];
    this.booking = nav?.extras?.state?.['booking'];
    this.user = this.auth.getUser();

    if (!this.helper || !this.booking || !this.user) {
      this.router.navigate(['/']);
    }
  }

  getProfileImage(): string {
    return this.helper?.gender === 'female'
      ? 'https://t4.ftcdn.net/jpg/08/23/95/89/360_F_823958944_1c9covIC7Tl7eyJtWoTiXc0L4vP6f43q.jpg'
      : 'https://img.freepik.com/premium-photo/funny-3d-avatar-man-suit-professional-lawyer-office-worker_1270124-12567.jpg';
  }

  selectMethod(method: MainMethod) {
    this.selectedMethod = method;
    this.selectedUpi = null;
  }

  selectUpi(method: UpiMethod) {
    this.selectedUpi = method;
  }

  payNow() {
    let paymentMethod: string;

    if (this.selectedMethod === 'UPI') {
      if (!this.selectedUpi) {
        alert('Select a UPI app');
        return;
      }
      paymentMethod = this.selectedUpi;
    }
    else if (this.selectedMethod === 'Card') {
      if (!this.card.number || !this.card.name || !this.card.expiry || !this.card.cvv) {
        alert('Enter card details');
        return;
      }
      paymentMethod = 'Card';
    }
    else {
      paymentMethod = 'Cash';
    }

    const payload = {
      userId: this.user.id,
      helperId: this.helper.id,
      serviceType: this.helper.priceType,
      bookingDate: this.booking.date,
      bookingTime: this.booking.time,
      location: this.booking.location,
      price: this.helper.price,
      paymentMethod
    };

    this.http.post('http://localhost:3000/api/pay-and-book', payload)
      .subscribe({
        next: () => {
          this.showSuccess = true;

          setTimeout(() => {
            this.router.navigate(['/payment-task-tracking'], {
              state: {
                helper: this.helper,
                booking: this.booking
              }
            });
          }, 2000);
        },
        error: () => alert('Payment failed')
      });
  }

  goBack() {
    this.router.navigate(['/book-now'], {
      state: { helper: this.helper, booking: this.booking }
    });
  }
}
