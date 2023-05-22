import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingupComponent } from './components/singup/singup.component';
import { LoginComponent } from './components/login/login.component';



const routes: Routes = [{path:'registrarse',component:SingupComponent},
{path:'inicio',component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
