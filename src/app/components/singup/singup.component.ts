import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {
  firstFormGroup = this._formBuilder.group({
    correo: ['', Validators.required],
    contrasena:['', Validators.required],
    confContrasena:['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthdate: ['', Validators.required],
    termsChecked: [false, Validators.requiredTrue]
  });
  @ViewChild('stepper') stepper: MatStepper | undefined;
  isLinear = false;
  uid:string|undefined;
  constructor(private _formBuilder: FormBuilder,private firebase: FirebaseService) {}
  async singup(){
    if(this.firstFormGroup.value.confContrasena==this.firstFormGroup.value.contrasena){
      let password=this.firstFormGroup.value.contrasena;
      let email=this.firstFormGroup.value.correo;
      this.firebase.signUp({password,email}).then((userCredential) => {
        
        this.uid= userCredential.user.uid;
        this.stepper?.next();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode=="auth/email-already-in-use"){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo ya está en uso',
            
          })
        }
      });
      
      
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coninciden',
        
      })
    }
  
  }
  finalizar(){
    if(this.uid!=undefined && this.secondFormGroup.value.termsChecked){
      this.firebase.addPersona(this.secondFormGroup.value,this.uid).then(()=>{
        Swal.fire({
          icon: 'success',
          title: 'Te has registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      }).catch(()=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error',
          
        })
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes aceptar los terminos y condiciones',
        
      })
    }
    
  }
}
