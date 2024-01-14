import { Injectable,  } from '@angular/core';
import Echo from 'laravel-echo';
import {
  environment,
  MIX_PUSHER_APP_KEY,
  MIX_PUSHER_FORCE_TLS,
  MIX_PUSHER_HOST,
  MIX_PUSHER_PORT,
  MIX_PUSHER_PORT_TLS,
  MIX_PUSHER_TRANSPORT,
} from '../../../environments/environment';
import { UserService } from '../services/user.service';
import { Subject } from 'rxjs';
import { User } from '../model/user';

// @ts-ignore
window.Pusher = require('pusher-js');

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private echo: Echo | null = null;

  private eventname = new Subject<any>();
  public eventnom = this.eventname.asObservable();

  constructor(private userService: UserService) {
    this.userService.getUser().then((res) => {
      if (res) {
        let userid = res.id;
        console.log(userid);
        this.initWs(userid);
      }
    });
  }
  
  private initWs(userid: number) {
    this.echo = new Echo({
        broadcaster: 'pusher',
      cluster: 'eu',
      key: MIX_PUSHER_APP_KEY,
      wsHost: MIX_PUSHER_HOST,
      wsPort: MIX_PUSHER_PORT,
      wssPort: MIX_PUSHER_PORT_TLS,
      forceTLS: MIX_PUSHER_FORCE_TLS,
      disableStats: true,
      enabledTransports: MIX_PUSHER_TRANSPORT,
      authEndpoint: environment.lrvUrl + '/broadcasting/auth',
      auth: {
        headers: {
          Authorization: "Bearer " + this.userService.token
        },
      },
    });
    this.echo.private(`App.Models.User.${userid}`).listen('.TestEvent', (event: any) => {
      this.eventname.next(event);
      console.log(event); 
    });
  }

}
