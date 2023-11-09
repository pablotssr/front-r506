import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss'],
})
export class LoggedComponent implements OnInit {
  userInfo: any;
  apiToken?: string;
  userHasPet: boolean = false;
  petInfo: any = {};
  token?: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.apiToken = params['api_token'];
      this.userInfo = JSON.parse(params['user_info']);
      console.log(this.apiToken);
      if(this.apiToken){
        this.token = this.apiToken;
        this.userService.savTokens({ access_token: this.token });
      }
      
      this.initializePetInfo();
    });
  }

  initializePetInfo() {
    this.userService.getPet().then(
      (response) => {
        this.userHasPet = true;
        this.petInfo = response;
      },
      () => {
        const petName = prompt('Please enter a name for your pet');
        if (petName) {
          this.userService.createPet(petName).subscribe(
            (createdPet) => {
              console.log(createdPet);
              this.userHasPet = true;
              this.petInfo = createdPet;
            },
            (createPetError) => {
              console.error(createPetError);
            }
          );
        }
      }
    );
  }
}
