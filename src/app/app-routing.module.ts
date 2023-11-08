import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PetComponent } from './pages/logged/pet/pet.component';
import { LoggedComponent } from './pages/logged/logged.component';
import { authGuard } from './shared/auth.guard';


const routes: Routes = [
  {path: 'login',component: LoginComponent, canActivate: [authGuard]},
  {path: '', component: LoggedComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
