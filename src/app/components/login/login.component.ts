import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  firstFormGroup = this._formBuilder.group({
    correo: ['', Validators.required],
    contrasena:['', Validators.required],
  });
  isLinear = false;
  constructor(private _formBuilder: FormBuilder,private firebase: FirebaseService) {}
  async iniciarSesion(){
    let password=this.firstFormGroup.value.contrasena;
    let email=this.firstFormGroup.value.correo;
    let usuario=await this.firebase.login({email,password})
    localStorage.setItem("login","true")
    localStorage.setItem("user",usuario.user.uid)
    window.location.reload()
  }
}
