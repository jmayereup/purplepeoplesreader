import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  store = inject(StoreService);
  userName = this.store.user.userName;
  userEmail = this.store.user.userEmail;
  userLinesRead = this.store.user.userLinesRead;

  updateUsername() {
    let newUsername = prompt("Enter a new username:");
    if (newUsername) {
      this.store.user.updateUsername(newUsername);
    }
  }
  
}
