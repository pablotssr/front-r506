import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  private url: string = '';
  constructor(private userService: UserService, private router: Router) {}

  private authState(): boolean {
    if (this.isLoginOrRegister()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

  private noAuthState(): boolean {
    if (this.isLoginOrRegister()) {
      return true;
    }
    this.router.navigate(['/login']);
    console.log('noauth');
    return false;
  }

  private isLoginOrRegister(): boolean {
    if (this.url.includes('/login')) {
      return true;
    }
    return false;
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (!this.userService.isInit) {
      let res = await this.userService.initPromise.subscribe((res) => {
        if (res) {
          return this.checkLogin(state);
        }
        return false;
      });
      if (!res) {
        return false;
      }
    }
    return this.checkLogin(state);
  }

  checkLogin(state: RouterStateSnapshot): boolean {
    this.url = state.url;
    if (this.userService.isLogged()) {
      return this.authState();
    }
    return this.noAuthState();
  }
}
