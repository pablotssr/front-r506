
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { LoggedComponent } from '../logged.component';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
  
})
export class PetComponent   {
  user: any = {};
  apiToken?: string;
  userHasPet: boolean = false;
  petInfo: any = {};
  token?: string;
  colorInt: string = ''; 
  showMessageDiv = false;
  showOverlay = false;
  modalMessage = '';

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
        this.petInfo = res.pet;
        this.colorInt = `color-${this.petInfo.color}`;

        console.log(this.petInfo);
      }
  });
}

showMessage(stat: string): void {
  let value: number | undefined;

  switch (stat) {
    case 'mental':
      value = this.petInfo.mental;
      break;
    case 'iq':
      value = this.petInfo.iq;
      break;
    case 'clean':
      value = this.petInfo.clean;
      break;
    default:
      break;
  }
  if (value !== undefined) {
    this.modalMessage = this.getMessage(stat, value);
    this.showMessageDiv = true;
  } else {
    this.modalMessage = 'Unknown Stat';
    this.showMessageDiv = true;
  }

}

getMessage(stat: string, value: number): string {
  if (stat === 'mental') {
    return this.getMessageForMental(value);
  } else if (stat === 'iq') {
    return this.getMessageForIQ(value);
  } else if (stat === 'clean') {
    return this.getMessageForCleanliness(value);
  } else {
    return 'Unknown Stat';
  }
}

getMessageForMental(value: number): string {
  if (value >= 75) {
    return 'Meilleure version de soi-même.';
  } else if (value < 75 && value >= 50) {
    return 'Content.';
  } else if (value < 50 && value >= 25) {
    return 'Pas au top.';
  } else {
    return 'En dépression.';
  }
}

getMessageForIQ(value: number): string {
  if (value >= 130) {
    return 'Einstein.';
  } else if (value < 130 && value >= 100) {
    return 'Intelligent.';
  } else if (value < 100 && value >= 70) {
    return 'Dans la moyenne.';
  } else if (value < 70 && value >= 50) {
    return 'Con de fou.';
  } else {
    return 'Se bave dessus.';
  }
}

getMessageForCleanliness(value: number): string {
  if (value >= 75) {
    return 'Resplendissant.';
  } else if (value < 75 && value >= 50) {
    return 'Propre.';
  } else if (value < 50 && value >= 25) {
    return 'Commence à sentir.';
  } else {
    return 'Plein de crasse.';
  }
}

closeMessage(): void {
  this.showMessageDiv = false;
  this.modalMessage = '';
}

}