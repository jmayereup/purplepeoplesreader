import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  store = inject(StoreService);

  registerData = {email: "", password:"", username:""};
  confirmationPassword = "";


  registerWithEmail() {
    this.store.user.registerWithEmail(this.registerData.email, this.registerData.password, this.registerData.username)
  }

  loginWithGoogle() {
    this.store.user.loginWithGoogle()
      .then(() => {
        // this.store.user.checkUser();
      })
      .catch((error) => {
        console.error('Error occurred during Google login:', error);
        alert('Error occurred during Google login:' + error);
      });
  }

}
