import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  hasShop: boolean = false;
  shopInfo: any = {};
  hasItems: boolean = true;

  shopItems: any[] = []; // Array to store item names and prices
  itemBought: boolean[] = []; // Array to track bought items
  itemIcons: string[] = []; // Array to store item icons

  constructor(
    private userService: UserService
  ) {}

ngOnInit() {
    this.loadShopItems();
  }

  loadShopItems() {
    this.userService.seeShop().then((res) => {
      if (res) {
        this.hasShop = true;
        this.shopInfo = res;
        this.hasItems = Object.keys(res).length > 0; // Check if the response has items
        if (this.hasItems) {
          this.initializeShopItems(res);
        }
        console.log(res);
      }
    });
  }

initializeShopItems(res: any) {
  for (let i = 1; i <= 3; i++) {
    const itemName = this.shopInfo[`Item${i}`];
    const price = this.shopInfo[`Price${i}`];

    this.shopItems.push({ name: itemName, price: price });
    this.itemBought.push(false); 
    this.itemIcons.push(this.getItemIcon(i)); 
  }
}

buyItem(itemNumber: number) {
  this.userService.buyItem(itemNumber).then((res) => {
    if (res) {
      this.itemBought[itemNumber - 1] = true;
      console.log(res);
    }
  });
}

getItemIcon(itemNumber: number): string {
  switch (itemNumber) {
    case 1:
      return 'fas fa-cubes-stacked fa-3x'; // Icon for item 1
    case 2:
      return 'fas fa-utensils fa-3x'; // Icon for item 2
    case 3:
      return 'fas fa-flask fa-3x'; // Icon for item 3
    default:
      return 'fas fa-question-circle fa-3x'; // Default icon if item number is not recognized
  }
}

}
