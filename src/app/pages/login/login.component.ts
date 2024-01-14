import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  environment = environment;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  async checkUserInfo() {
    try {
      await this.userService.getUser();
      console.log('User Info:', this.userService.user);
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }
}
