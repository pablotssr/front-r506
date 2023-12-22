import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
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

      for (let key in this.shopInfo) {
        if (key.startsWith('Item')) {
          this.items.push(this.shopInfo[key]);
        } else if (key.startsWith('Price')) {
          this.prices.push({
            value: this.shopInfo[key],
            disabled: false 
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
        this.prices[itemIndex].value = 'X'; 
        this.prices[itemIndex].disabled = true; 
        console.log(selectedItem);
      }).catch((error) => {
        console.error('Purchase failed:', error);
      });
    }
  }
  
}
