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

  loginData = { email: "", password: "" };

  constructor() {

  }

  loginWithEmail() {
    this.store.user.loginWithEmail(this.loginData.email, this.loginData.password).then(() => {
      this.store.user.getUser();
    });
  }

  loginWithGoogle() {
    this.store.user.loginWithGoogle().then(() => {
      this.store.user.getUser();
    });
  }
  logout() {
    this.store.user.clear();
    this.store.user.getUser();
  }


}
