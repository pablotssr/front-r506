import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  handleProviderCallback() {
    return this.http.get(environment.apiUrl + '/login/provider/callback').pipe(
      tap((response: any) => {
        const apiToken = response.api_token;
        const userInfo = response.user_info;

        localStorage.setItem('api_token', apiToken);
        localStorage.setItem('user_info', JSON.stringify(userInfo));

      })
    );
  }

  getUserInfo() {
    const apiToken = localStorage.getItem('api_token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${apiToken}`
    );
    return this.http.get(environment.apiUrl + '/api/user', { headers });
  }
}
