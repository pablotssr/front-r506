import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PetComponent } from './pages/logged/pet/pet.component';
import { LoggedComponent } from './pages/logged/logged.component';


const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'home', component: LoggedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
