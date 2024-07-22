import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent {
  authService = inject(AuthService);

  email: string = '';
  password: string = '';
  isAuthenticated = this.authService.isAuthenticated;
  user = this.authService.user;

  constructor() {}

  loginWithEmail(): void {
    this.authService.loginWithEmail(this.email, this.password);
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  logout(): void {
    this.authService.logout();
  }
}
