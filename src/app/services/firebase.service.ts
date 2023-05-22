import { Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword, getAuth} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  authf=getAuth()
  constructor(private auth:Auth,private firestore:Firestore) { }
  login(objeto:any){
    let email=objeto["email"]
    let password=objeto["password"]
    return signInWithEmailAndPassword(this.auth,email,password)
  }
  userObserver(){
    let usuario=this.auth.currentUser
    return usuario
  }
  cerrarSesion(){
    return signOut(this.auth)
  }
  signUp(objeto:any){
    let email=objeto["email"]
    let password=objeto["password"]
    return createUserWithEmailAndPassword(this.auth,email,password)
  }
  addPersona(usuario:any,id:string){
    usuario.estado=true;
    const usuarioRef=doc(this.firestore,"usuarios",id)
    return setDoc(usuarioRef,usuario)
  }
  
}
