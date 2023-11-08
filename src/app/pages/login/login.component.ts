import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UserService } from '../../shared/services/user.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  logbtn() {
    window.location.href = environment.lrvUrl + '/login/google';
  }
  
async checkUserInfo() {
  try {
    await this.userService.getUser(); // Call the modified getUser function
    console.log('User Info:', this.userService.user); // Assuming you store user info in userService.user
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error; // rethrow the error
  }
}

  handleProviderCallback() {
    this.userService.handleProviderCallback().subscribe((response) => {
      console.log('Handle Provider Callback Response:', response);
      this.router.navigate(['']);
      // Additional code after successful callback if needed
    });
  }
}
