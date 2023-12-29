import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  store = inject(StoreService);

  linesRead = this.store.user.userLinesRead;
  userName = this.store.user.userName;
  userEmail = this.store.user.userEmail;
  errorMesage = "";

  loginData = { email: "", password: "" };

  constructor() {

  }

  loginWithEmail() {
    this.store.user.loginWithEmail(this.loginData.email, this.loginData.password).then(() => {
      // this.store.user.checkUser();
    })
    .catch((error) => {
      console.error('Error occurred during email login:', error);
      this.errorMesage = error;
    });
  }

  loginWithGoogle() {
    this.store.user.loginWithGoogle()
      .then(() => {
        // this.store.user.checkUser();
      })
      .catch((error) => {
        console.error('Error occurred during Google login:', error);
        this.errorMesage = error;
      });
  }

  clearError() {  
    this.errorMesage = "";
  }

  logout() {
    this.store.user.clear();
    this.store.user.clearUser();
  }
}
