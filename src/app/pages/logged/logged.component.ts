import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnInit {
  userInfo: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserInfo().subscribe((data: any) => {
      this.userInfo = data.user_info;
      console.log(this.userInfo);
    });
  }
}
