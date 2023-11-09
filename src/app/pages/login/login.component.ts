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
  
  constructor(private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  // logbtn() {
  //   this.http.get<any>(environment.lrvUrl + '/login/google').subscribe(
  //     (response) => {
  //       console.log(response);
  //       const apiToken = response['api_token'];
  //       const userInfo = response['user_info'];
  
  //       localStorage.setItem('api_token', apiToken);
  //       localStorage.setItem('user_info', userInfo);      },
  //     (error) => {
  //       console.error(error);
        
  //     }
  //   );}
  
async checkUserInfo() {
  try {
    await this.userService.getUser(); // Call the modified getUser function
    console.log('User Info:', this.userService.user); // Assuming you store user info in userService.user
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error; // rethrow the error
  }
}


}
