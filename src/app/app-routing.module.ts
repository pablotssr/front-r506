import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PetComponent } from './pages/logged/pet/pet.component';
import { LoggedComponent } from './pages/logged/logged.component';
import { authGuard } from './shared/auth.guard';
import { ShopComponent } from './pages/logged/shop/shop.component';
import { DiaryComponent } from './pages/logged/diary/diary.component';
import { InfosComponent } from './pages/logged/infos/infos.component';
import { MathsComponent } from './pages/logged/pet/maths/maths.component';
import { SnakeComponent } from './pages/logged/pet/snake/snake.component';
import { RunComponent } from './pages/logged/pet/run/run.component';



const routes: Routes = [
  {path: 'login',component: LoginComponent, canActivate: [authGuard]},
  {path: '', component: LoggedComponent, canActivate: [authGuard],
  children: [
    {path: 'pet',component: PetComponent, canActivate: [authGuard]},
    {path: 'shop', component: ShopComponent, canActivate: [authGuard]},
    {path: 'diary', component: DiaryComponent, canActivate: [authGuard]},
    {path: 'infos', component: InfosComponent, canActivate: [authGuard]},
    {path: 'maths', component: MathsComponent, canActivate: [authGuard]},
    {path: 'snake', component: SnakeComponent, canActivate: [authGuard]},
    {path: 'run', component: RunComponent, canActivate: [authGuard]}

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
