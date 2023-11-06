import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LoggedComponent } from './pages/logged/logged.component';
import { CompleteRegisteringComponent } from './pages/complete-registering/complete-registering.component';
import { NewPetComponent } from './pages/logged/new-pet/new-pet.component';
import { PetComponent } from './pages/logged/pet/pet.component';
import { DiaryComponent } from './pages/logged/diary/diary.component';
import { ShopComponent } from './pages/logged/shop/shop.component';
import { InfosComponent } from './pages/logged/infos/infos.component';
import { SnakeComponent } from './pages/logged/pet/snake/snake.component';
import { RunComponent } from './pages/logged/pet/run/run.component';
import { MathsComponent } from './pages/logged/pet/maths/maths.component';
import { InventoryComponent } from './pages/logged/inventory/inventory.component';
import { EventsComponent } from './pages/logged/events/events.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoggedComponent,
    CompleteRegisteringComponent,
    NewPetComponent,
    PetComponent,
    DiaryComponent,
    ShopComponent,
    InfosComponent,
    SnakeComponent,
    RunComponent,
    MathsComponent,
    InventoryComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
