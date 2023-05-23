import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, addDoc, collectionData, getDoc } from '@angular/fire/firestore';
import { Post } from '../components/post/post.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  authf = getAuth()
  constructor(private auth: Auth, private firestore: Firestore) { }
  login(objeto: any) {
    let email = objeto["email"]
    let password = objeto["password"]
    return signInWithEmailAndPassword(this.auth, email, password)
  }
  userObserver() {
    let usuario = this.auth.currentUser
    return usuario
  }
  cerrarSesion() {
    return signOut(this.auth)
  }
  signUp(objeto: any) {
    let email = objeto["email"]
    let password = objeto["password"]
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  addPersona(usuario: any, id: string) {
    usuario.estado = true;
    const usuarioRef = doc(this.firestore, "usuarios", id)
    return setDoc(usuarioRef, usuario)
  }

  async getPersona(id: string) {
    const usuarioRef = doc(this.firestore, "usuarios", id);
    try {
      const docSnap = await getDoc(usuarioRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("El usuario no existe");
      }
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  async getPersonaActiva() {
    const user = this.userObserver();
    if (user != null) {
      return this.getPersona(user.uid);
    }
    return undefined;
  }

  async savePost(post: Post) {
    const user = await this.getPersonaActiva();
    if (user) {
      post.autor = user['firstName'] + ' ' + user['lastName'];
      post.document = 'document.pdf'
      const postId = collection(this.firestore, 'posts');
      return addDoc(postId, post);
    } else {
      throw new Error('No se pudo obtener el usuario activo.');
    }
  }

  getPosts(): Observable<Post[]> {
    const postId = collection(this.firestore, 'posts');
    return collectionData(postId, { idField: 'id' }) as Observable<Post[]>;
  }
}
