import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  login() {
    if (!this.email || !this.password) {
      alert('Please enter both email and password');
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        console.log('✅ Login successful, navigating to tasks...');
      },
      error: (err) => {
        console.error('❌ Login failed:', err);
        alert('Invalid credentials');
      },
    });
  }
}
