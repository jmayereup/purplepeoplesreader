import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  auth = inject(AuthService);
  authStore = this.auth.authStore;

  loginData = {email: "", password:""};

  constructor() {

  }

  loginWithEmail() {
    this.auth.loginWithEmail(this.loginData.email, this.loginData.password)
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

  logout() {
    this.authStore.clear();
    }

  
}
