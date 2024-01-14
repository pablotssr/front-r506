import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss'],
})
export class LoggedComponent implements OnInit {
  user: any = {};
  apiToken?: string;
  userHasPet: boolean = false;
  petInfo: any = {};
  token?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  shouldDisplayNavButtons(): boolean {
    const currentRoute = this.route.snapshot.firstChild?.routeConfig?.path;
    return currentRoute
      ? !['maths', 'snake', 'run'].includes(currentRoute)
      : true;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      this.apiToken = params['apiToken'];
      this.user = await this.userService.getUser();
      if (this.apiToken) {
        this.token = this.apiToken;
        this.userService.savTokens({ access_token: this.token });
      }
      this.initializePetInfo();
    });
  }

  initializePetInfo() {
    this.userService
      .getPet()
      .then((res) => {
        if (res && res.pet) {
          this.petInfo = res.pet;
          this.router.navigate(['/pet']);
        } else {
          const petName = prompt('Enter the name for your new pet:');
          if (petName) {
            this.userService
              .createPet(petName)
              .then((newPetInfo) => {
                this.userHasPet = true;
                this.petInfo = newPetInfo.pet;
                this.router.navigate(['/pet']);
              })
              .catch((createPetError) => {
                console.error('Error creating a new pet', createPetError);
              });
          } else {
            console.log('User did not enter a pet name');
          }
        }
        this.router.navigate(['/pet']);
      })
      .catch((error) => {
        console.error('Error fetching pet information', error);
      });
  }

  navigateTo(page: string) {
    const currentUrl = this.router.url.split('/')[1];
    if (currentUrl !== page) {
      this.router.navigate([`/${page}`]);
    }
  }
}
