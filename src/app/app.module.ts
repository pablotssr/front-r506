import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LoggedComponent } from './pages/logged/logged.component';
import { PetComponent } from './pages/logged/pet/pet.component';
import { DiaryComponent } from './pages/logged/diary/diary.component';
import { ShopComponent } from './pages/logged/shop/shop.component';
import { InfosComponent } from './pages/logged/infos/infos.component';
import { SnakeComponent } from './pages/logged/pet/snake/snake.component';
import { RunComponent } from './pages/logged/pet/run/run.component';
import { MathsComponent } from './pages/logged/pet/maths/maths.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './shared/services/user.service';
import { authGuard } from './shared/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoggedComponent,
    PetComponent,
    DiaryComponent,
    ShopComponent,
    InfosComponent,
    SnakeComponent,
    RunComponent,
    MathsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    UserService, authGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
