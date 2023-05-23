import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingupComponent } from './components/singup/singup.component';
import { LoginComponent } from './components/login/login.component';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';
import { HomeComponent } from './components/home/home.component';



const routes: Routes = [
  { path: 'registrarse', component: SingupComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: LoginComponent },
  { path: 'terminos-y-condiciones', component: TerminosCondicionesComponent},
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
