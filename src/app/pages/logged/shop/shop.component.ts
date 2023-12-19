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

  shopItems: any[] = []; 
  itemBought: boolean[] = []; 
  itemIcons: string[] = []; 

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
        this.hasItems = Object.keys(res).length > 0; 
        if (this.hasItems) {
          this.initializeShopItems(res);
        }
        console.log(res);
      }
    });
  }

  initializeShopItems(res: any) {
    this.shopItems = [];
    this.itemBought = [];
    this.itemIcons = [];
  
    for (let i = 1; i <= 3; i++) {
      const itemName = res[`Item${i}`];
      const price = res[`Price${i}`];
  
      if (itemName && price) {
        this.shopItems.push({ name: itemName, price: price });
        this.itemBought.push(false);
        this.itemIcons.push(this.getItemIcon(i));
      } else {
        this.itemBought.push(true);
      }
    }
  }

  buyItem(itemNumber: number) {
    this.userService.buyItem(itemNumber).then((res) => {
      if (res) {
        this.itemBought[itemNumber - 1] = true;
        this.loadShopItems();
        console.log(res);
      }
    });
  }

getItemIcon(itemNumber: number): string {
  switch (itemNumber) {
    case 1:
      return 'fas fa-cubes-stacked fa-3x'; 
    case 2:
      return 'fas fa-utensils fa-3x'; 
    case 3:
      return 'fas fa-flask fa-3x'; 
    default:
      return 'fas fa-question-circle fa-3x'; 
  }
}

}
