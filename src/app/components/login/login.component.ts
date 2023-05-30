import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = '';

  firstFormGroup = this._formBuilder.group({
    correo: ['', Validators.required],
    contrasena:['', Validators.required],
  });
  isLinear = false;
  constructor(private _formBuilder: FormBuilder,private firebase: FirebaseService, private router: Router) {}
  async iniciarSesion(){
    let password=this.firstFormGroup.value.contrasena;
    let email=this.firstFormGroup.value.correo;

    try {
      let usuario = await this.firebase.login({email,password});
      this.router.navigate(['/home']);
      localStorage.setItem("login","true")
      localStorage.setItem("useruid", usuario.user.uid)
    } catch (error) {
      console.error('Error al iniciar sesion:', error);
      console.log('error');
      this.errorMessage = 'El usuario o la contraseña son incorrectos';
    }
  }
}
