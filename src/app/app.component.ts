import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  title = 'front-r506';
  constructor(public userService: UserService) {}
  // logoutbtn(){
  //   window.location.href = environment.apiUrl + '/logout'
  // }
}
