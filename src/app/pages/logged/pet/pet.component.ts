import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { LoggedComponent } from '../logged.component';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
})
export class PetComponent implements OnInit {
  user: any = {};
  apiToken?: string;
  userHasPet: boolean = false;
  petInfo: any = {};
  caresseInfo: any = {};
  laverInfo: any = {};
  userInventory?: any;
  hasInv: boolean = false;
  hasEvent: boolean = false;
  nomdevent?: string;
  token?: string;
  colorInt: string = '';
  showMessageDiv = false;
  showNewButtons = false;
  showInventoryForDisplay: boolean = false;
  showInventoryForGiving: boolean = false;
  showOverlay = false;
  modalMessage = '';
  buttonStates: { [key: number]: boolean } = {};
  eventMessage: string = '';
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private logged: LoggedComponent,
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit() {
    this.a();
    this.verif();
    this.subscribeToWebSocketEvents();
  }

  closeEvent() {
    this.hasEvent = false;
    this.nomdevent = '';
  }

  private subscribeToWebSocketEvents() {
    this.websocketService.eventnom.subscribe((event) => {
      if (event) {
        this.hasEvent = true;
        this.nomdevent = event.event;
      }
    });
  }

  a() {
    this.userService.getPet().then((res) => {
      if (res && res.pet) {
        this.userHasPet = true;
        this.petInfo = res.pet;
        this.colorInt = `color-${this.petInfo.color}`;
      }
    });
  }

  verif() {
    this.userService.checkAction().then((res) => {
      if (res && res.actionsPerformed) {
        const performedActions = res.actionsPerformed as number[];
        if (performedActions.length === 2) {
          this.enableAllButtons();
        } else if (performedActions.length === 1) {
          performedActions.forEach((actionId) => {
            this.disableButton(actionId);
          });
        }
      }
    });
  }

  enableAllButtons() {
    Object.keys(this.buttonStates).forEach((buttonId) => {
      this.zone.run(() => {
        this.buttonStates[parseInt(buttonId)] = false;
      });
    });
  }

  disableButton(actionId: number) {
    this.zone.run(() => {
      this.buttonStates[actionId] = true;
    });
  }

  caresse() {
    this.userService.toPet().then((res) => {
      if (res && res.caresser) {
        this.caresseInfo = res.caresser;
        this.verif();
        this.navigateTo('pet');
      }
    });
  }

  laver() {
    this.userService.toClean().then((res) => {
      if (res && res.laver) {
        this.laverInfo = res.laver;
        this.verif();
        this.navigateTo('pet');
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
    });
  }

  handleItemClick(item_Id: number) {
    this.userService.giveItem(item_Id).then((res) => {
      if (res) {
        this.fetchInventory();
        this.closeMessage();
        console.log(res);
        this.navigateTo('pet');
      }
    });
  }

  getIconClass(itemId: number): string {
    if (itemId === 1 || itemId === 2) {
      return 'fas fa-cubes-stacked';
    } else if (itemId === 3 || itemId === 4) {
      return 'fas fa-utensils';
    } else if (itemId === 5 || itemId === 6) {
      return 'fas fa-flask';
    } else {
      return 'fas fa-question';
    }
  }

  navigateTo(page: string) {
    const currentUrl = this.router.url.split('/')[1];
    if (currentUrl !== page) {
      this.router.navigate([`/${page}`]);
    }
  }

  closeMessage(): void {
    this.showMessageDiv = false;
    this.modalMessage = '';
  }
}
