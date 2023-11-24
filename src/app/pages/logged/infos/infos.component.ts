import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent {
  userHasInfos: boolean = false;
  userInfo: any = {};

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(){
    this.a();
  }

  a(){
    this.userService.getInfo().then((res) => {
      if (res ) {
        this.userHasInfos = true;
        this.userInfo = res;
        console.log(res);
      }
  });
}
}
