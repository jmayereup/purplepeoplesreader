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

  loginData = { email: "", password: "" };

  constructor() {

  }

  loginWithEmail() {
    this.store.user.loginWithEmail(this.loginData.email, this.loginData.password).then(() => {
      // this.store.user.checkUser();
    });
  }

  loginWithGoogle() {
    this.store.user.loginWithGoogle().then(() => {
      // this.store.user.checkUser();
    });
  }
  logout() {
    this.store.user.clear();
    this.store.user.clearUser();
  }


}
