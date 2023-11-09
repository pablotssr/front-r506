import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../model/user';
// import { DateTime } from 'luxon';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private token?: string;
  
  private googleToken?: {
    token?: string;
    refresh_token: string;
    // expires_at: DateTime;
  };

  urlParams: any;

  user?: User;

  isInit: boolean = false;
  initPromise: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {
    this.init();
  }

  public async init() {
    this.urlParams = new URLSearchParams(window.location.search);

    if (this.urlParams.has('code')) {
      let code = this.urlParams.get('code') as string;
      let res = await this.requestApi('/login/google/callback', 'GET', {code});
      if (res && res.token) {
        this.user = res.user;
        this.savTokens(res.token);
      }
    } else {
      this.token = localStorage.getItem('apiToken') ? JSON.parse(localStorage.getItem('apiToken') as string).token : undefined;

      if (this.token) {
        await this.getUser();
      }
    }

    this.isInit = true;
    this.initPromise.next(true);
  }

  public async requestApi(action: string, method: string = 'GET', datas: any = {}, httpOptions: any = {}): Promise<any> {
    // if (!this.onlineStatusService.getIsOnline()) {
    //   console.log('no request because offline');
    //   return;
    console.log('the token', this.token);

    const methodWanted = method.toLowerCase();
    let route = environment.apiUrl + action;

    let req = null;

    if (httpOptions.headers === undefined) {
      httpOptions.headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
    }

    if (this.token) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
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
        route += '?' + Object.keys(datas).map((key) => {
          return key + '=' + datas[key];
        }).join('&');

        req = this.http.delete(route, httpOptions);
        break;
      default:
        route += '?' + Object.keys(datas).map((key) => {
          return key + '=' + datas[key];
        }).join('&');

        req = this.http.get(route, httpOptions);
        break;
    }

    return req.toPromise();
  }

  savTokens(apiToken: {
    access_token:string
    //
  }  ){
    localStorage.setItem('apiToken', JSON.stringify({
      token: apiToken.access_token,
      // expires_at: DateTime.now().plus({seconds: apiToken.expires_in}).toISO(),
    }));

    this.token = apiToken.access_token;
  }

  async getUser() {
    await this.requestApi('/user', 'GET')
      .then((res) => {
        this.user = res;
      }, (err) => {
        console.error(err);
        this.logout();
      });
  }

   isLogged(): boolean{
    return this.token !== undefined;
  }
  
  isCompleteProfile(): boolean{
    return !!this.user?.name;
  }

  logout(){
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
     return this.http.post(
       environment.apiUrl + '/pet',
       { name },
     );
   }

   getPet() {
     console.log('aaaaaaaahhhhhhhhh', this.token);
     return this.requestApi('/pet');
   }

  // isLogged(): boolean {
  //   return this.token !== undefined;
  // }

  
}
