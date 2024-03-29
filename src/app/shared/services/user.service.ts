import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../model/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public token?: string;

  public googleToken?: {
    token?: string;
    refresh_token: string;
  };

  urlParams: any;

  user?: User;

  isInit: boolean = false;
  initPromise: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    this.init();
  }

  public async init() {
    this.urlParams = new URLSearchParams(window.location.search);

    if (this.urlParams.has('code')) {
      let code = this.urlParams.get('code') as string;
      let res = await this.requestApi('/login/google/callback', 'GET', {
        code,
      });
      if (res && res.token) {
        this.user = res.user;
        this.savTokens(res.token);
      }
    } else if (this.urlParams.has('apiToken')) {
      localStorage.setItem('apiToken', this.urlParams.get('apiToken'));
      this.user = this.urlParams.get('user');
      this.token = this.urlParams.get('apiToken');
      console.log(this.token);
      this.router.navigate(['/']);
    } else {
      let token = localStorage.getItem('apiToken');
      console.log(token);
      if (token) {
        this.token = token;
      }
    }
    this.isInit = true;
    this.initPromise.next(true);
  }

  public async requestApi(
    action: string,
    method: string = 'GET',
    datas: any = {},
    httpOptions: any = {}
  ): Promise<any> {
    const methodWanted = method.toLowerCase();
    let route = environment.apiUrl + action;

    let req = null;

    if (httpOptions.headers === undefined) {
      httpOptions.headers = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
    }

    if (this.token) {
      httpOptions.headers = httpOptions.headers.set(
        'Authorization',
        'Bearer ' + this.token
      );
    }

    switch (methodWanted) {
      case 'post':
        req = this.http.post(route, datas, httpOptions);
        break;
      case 'patch':
        req = this.http.post(route, datas, httpOptions);
        break;
      case 'put':
        req = this.http.put(route, datas, httpOptions);
        break;
      case 'delete':
        route +=
          '?' +
          Object.keys(datas)
            .map((key) => {
              return key + '=' + datas[key];
            })
            .join('&');

        req = this.http.delete(route, httpOptions);
        break;
      default:
        route +=
          '?' +
          Object.keys(datas)
            .map((key) => {
              return key + '=' + datas[key];
            })
            .join('&');

        req = this.http.get(route, httpOptions);
        break;
    }

    return req.toPromise();
  }

  savTokens(apiToken: { access_token: string }) {
    localStorage.setItem('apiToken', JSON.stringify(apiToken));
    this.token = apiToken.access_token;
  }

  async getUser() {
    try {
      const res = await this.requestApi('/user', 'GET');
      this.user = res;
      return res;
    } catch (err) {
      console.error(err);
      this.logout();
    }
  }

  isLogged(): boolean {
    return this.token !== undefined;
  }

  isCompleteProfile(): boolean {
    return !!this.user?.name;
  }

  logout() {
    localStorage.removeItem('apiToken');
    localStorage.removeItem('gitHubToken');
    this.token = undefined;
    this.googleToken = undefined;
    this.user = undefined;
    this.router.navigate(['/login']);
  }

  private addHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }
  getUserInfo() {
    return this.http.get(environment.apiUrl + '/user', {
      headers: this.addHeaders(),
    });
  }

  createPet(name: string) {
    return this.requestApi('/pet', 'POST', { name });
  }

  getPet() {
    return this.requestApi('/pet', 'GET');
  }

  petDiary() {
    return this.requestApi('/pet/diary', 'GET');
  }

  toPet() {
    return this.requestApi('/action/caresser', 'GET');
  }

  mathRes(score: number) {
    return this.requestApi('/action/maths', 'POST', { score });
  }

  snakeRes(score: number) {
    return this.requestApi('/action/snake', 'POST', { score });
  }

  runRes(score: number) {
    return this.requestApi('/action/run', 'POST', { score });
  }

  giveItem(item_Id: number) {
    return this.requestApi('/action/give', 'POST', { item_Id });
  }

  inventory() {
    return this.requestApi('/item/inventory/see', 'GET');
  }

  checkAction() {
    return this.requestApi('/action/done', 'GET');
  }

  buyItem(item: number) {
    return this.requestApi('/item/buy', 'POST', { item });
  }
  seeShop() {
    return this.requestApi('/item/shop/see', 'GET');
  }

  toClean() {
    return this.requestApi('/action/laver', 'GET');
  }
  getInfo() {
    return this.requestApi('/auth/infos', 'GET');
  }
}
