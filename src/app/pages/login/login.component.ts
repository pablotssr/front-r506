import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
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
  ) //  private route: ActivatedRoute
  {}

  logbtn() {
    window.location.href = environment.apiUrl + '/login/google';
  }
  
  checkUserInfo() {
    this.userService
      .getUserInfo()
      .pipe(
        map((user: any) => {
          console.log('User Info:', user);
        }),
        catchError((error) => {
          console.error('Error fetching user info:', error);
          throw error; // rethrow the error
        })
      )
      .subscribe();
  }

  handleProviderCallback() {
    this.userService.handleProviderCallback().subscribe();
  }
}
