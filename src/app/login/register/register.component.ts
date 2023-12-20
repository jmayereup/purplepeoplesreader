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


  registerWithEmail() {
    // this.store.registerWithEmail(this.registerData.email, this.registerData.password, this.registerData.username)
  }
}
