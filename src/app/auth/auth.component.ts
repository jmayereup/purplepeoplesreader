import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, SpinnerComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent {
  authService = inject(AuthService);

  email: string = '';
  password: string = '';
  isAuthenticated = this.authService.isAuthenticated;
  user = this.authService.user;
  waiting = false;

  constructor() {}

  async loginWithEmail() {
    this.waiting = true;
    await this.authService.loginWithEmail(this.email, this.password);
    this.waiting = false;
  }

  async loginWithGoogle() {
    this.waiting = true;
    await this.authService.loginWithGoogle();
    this.waiting = false;
  }

  logout(): void {
    this.authService.logout();
  }
}
