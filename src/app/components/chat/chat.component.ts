import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user: any;
  partner = '';       // username to chat with
  message = '';
  messages: any[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

  loadChat() {
    if (!this.partner) return;

    this.auth
      .getChatHistory(this.user.username, this.partner)
      .subscribe(res => this.messages = res);
  }

  send() {
    if (!this.message.trim()) return;

    const payload = {
      sender: this.user.username,
      receiver: this.partner,
      message: this.message
    };

    this.auth.sendMessage(payload).subscribe(() => {
      this.messages.push(payload);
      this.message = '';
    });
  }
  goBack(): void {
    this.router.navigate(['/']);
  }
}
