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
  items: string[] = [];
  prices: { value: any; disabled: boolean }[] = [];

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(){
    this.shop();
  }

  shop() {
    this.userService.seeShop().then((res) => {
      this.hasShop = true;
      this.shopInfo = res;
      
      // Extracting items and prices from the response
      for (let key in this.shopInfo) {
        if (key.startsWith('Item')) {
          this.items.push(this.shopInfo[key]);
        } else if (key.startsWith('Price')) {
          this.prices.push({
            value: this.shopInfo[key],
            disabled: false // Button initially enabled
          });
        }
      }
      console.log(res);
    });
  }
  
  buyItem(itemIndex: number) {
    const selectedItem = this.items[itemIndex];
    if (!this.prices[itemIndex].disabled) {
      this.userService.buyItem(itemIndex + 1).then(() => {
        // Logic for updating UI after a successful purchase
        this.prices[itemIndex].value = 'X'; // Update the price to 'X'
        this.prices[itemIndex].disabled = true; // Disable the button
        console.log(selectedItem);
      }).catch((error) => {
        // Handle errors if the purchase fails
        console.error('Purchase failed:', error);
      });
    }
  }
  
}
