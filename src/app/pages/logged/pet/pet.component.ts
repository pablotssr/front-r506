
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { LoggedComponent } from '../logged.component';
@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent   {
  user: any = {};
  apiToken?: string;
  userHasPet: boolean = false;
  petInfo: any = {};
  token?: string;

  constructor(
    private logged: LoggedComponent,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(){
    this.a();
  }

  a(){
    this.userService.getPet().then((res) => {
      if (res && res.pet) {
        this.userHasPet = true;
        this.petInfo = res.pet;;
        console.log(this.petInfo);
      }
  });
}
  
}