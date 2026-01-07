import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user: any;
  contacts: any[] = [];

  selectedUser: any = null;
  messages: any[] = [];
  messageText = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();

    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadContacts();
  }

  loadContacts(): void {
    this.auth.getChatContacts(
      this.user.username,
      this.user.role
    ).subscribe({
      next: (res: any[]) => this.contacts = res,
      error: err => console.error(err)
    });
  }

  openChat(c: any): void {
    this.selectedUser = c;

    this.auth.getChatHistory(
      this.user.username,
      c.username
    ).subscribe({
      next: (res: any[]) => this.messages = res,
      error: err => console.error(err)
    });
  }

  sendMessage(): void {
    if (!this.messageText.trim() || !this.selectedUser) return;

    const payload = {
      sender: this.user.username,
      receiver: this.selectedUser.username,
      message: this.messageText
    };

    this.auth.sendMessage(payload).subscribe(() => {
      this.messages.push({
        sender: payload.sender,
        receiver: payload.receiver,
        message: payload.message,
        created_at: new Date()
      });
      this.messageText = '';
    });
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }

  getImage(gender: string): string {
    return gender?.toLowerCase() === 'female'
      ? 'https://t4.ftcdn.net/jpg/08/23/95/89/360_F_823958944_1c9covIC7Tl7eyJtWoTiXc0L4vP6f43q.jpg'
      : 'https://img.freepik.com/premium-photo/funny-3d-avatar-man-suit-professional-lawyer-office-worker_1270124-12567.jpg';
  }
}
