
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
  caresseInfo: any = {};
  laverInfo: any = {};
  userInventory?: any;
  hasInv: boolean = false;
  token?: string;
  colorInt: string = '';

  showMessageDiv = false;
  showNewButtons = false;
  showInventoryForDisplay: boolean = false;
  showInventoryForGiving: boolean = false;
  showOverlay = false;
  modalMessage = '';

  constructor(
    private logged: LoggedComponent,
    private router: Router,
    private route: ActivatedRoute,
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

caresse(){
  this.userService.toPet().then((res) => {
    if (res && res.caresser) {
      this.caresseInfo = res.caresser;
      console.log(this.caresseInfo);
    }
  })
}

laver(){
  this.userService.toClean().then((res) => {
    if (res && res.laver) {
      this.laverInfo = res.laver;
      console.log(this.laverInfo);
    }
  })
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
    this.showNewButtons = false;
    this.showInventoryForDisplay = false;
    this.showInventoryForGiving = false;
  } else {
    this.modalMessage = 'Unknown Stat';
    this.showMessageDiv = true;
  }

}

showNewButtonsWindow(): void {
  this.showNewButtons = true;
  this.showInventoryForDisplay = false;
  this.showInventoryForGiving = false;
  this.showMessageDiv = true;
  this.modalMessage = ''; 
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

showInventory() {
  this.showInventoryForDisplay = true;
  this.showInventoryForGiving = false;
  this.fetchInventory(); 
}

inventoryGiving() {
  this.showInventoryForDisplay = false;
  this.showInventoryForGiving = true;
  this.fetchInventory();
}

fetchInventory() {
  this.userService.inventory().then((res) => {
    if (res) {
      this.showMessageDiv = true;
      this.hasInv = true;
      this.showNewButtons = false;
      this.userInventory = res.inventaire;
    }
    console.log(this.userInventory)
  });
}

handleItemClick(item_Id: number) {
  this.userService.giveItem(item_Id).then((res) => {
    if (res){
      this.fetchInventory();
      this.closeMessage();
      this.navigateTo('pet');
    }
  })
}

getIconClass(itemId: number): string {
  if (itemId === 1 || itemId === 2) {
    return 'fas fa-cubes-stacked'; // Replace 'fa-icon1' with your desired icon class
  } else if (itemId === 3 || itemId === 4) {
    return 'fas fa-utensils'; // Replace 'fa-icon2' with another icon class
  } else if (itemId === 5 || itemId === 6) {
    return 'fas fa-flask'; // Replace 'fa-icon3' with the third icon class
  } else {
    return 'fas fa-question'; // Default icon class for unknown items
  }
}

navigateTo(page: string){
  const currentUrl = this.router.url.split('/')[1]; // Get the current route path

  console.log(currentUrl);
if (currentUrl !== page) {
   this.router.navigate([`/${page}`]); 
 }
 }
 
closeMessage(): void {
  this.showMessageDiv = false;
  this.modalMessage = '';
}

}