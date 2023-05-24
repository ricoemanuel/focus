import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, addDoc, collectionData, getDoc, query, where, CollectionReference  } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { Post } from '../components/post/post.model';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  authf = getAuth()
  constructor(private auth: Auth, private firestore: Firestore, private storage: Storage) { }
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

  async savePost(post: Post, file: any) {
    const user = await this.getPersonaActiva();
    if (user) {
      try {
        const fileUrl = await this.uploadImage(file);
        post.autor = user['firstName'] + ' ' + user['lastName'];
        post.document = fileUrl;
        const postId = collection(this.firestore, 'posts');
        return addDoc(postId, post);
      } catch (error) {
        throw new Error('Error al guardar el post: ' + error);
      }
    } else {
      throw new Error('No se pudo obtener el usuario activo.');
    }
  }

  uploadImage(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log(file);
      
      const storageRef = ref(this.storage, `files/${new Date().getTime() + file.name}`);
      
      uploadBytes(storageRef, file)
        .then(() => {
          getDownloadURL(storageRef)
            .then(downloadURL => {
              console.log('Enlace público:', downloadURL);
              resolve(downloadURL); 
            })
            .catch(error => {
              console.log('Error al obtener el enlace público:', error);
              reject(error); 
            });
        })
        .catch(error => {
          console.log('Error al subir el archivo:', error);
          reject(error); 
        });
    });
  }

  getPosts(): Observable<Post[]> {
    const postId = collection(this.firestore, 'posts');
    return collectionData(postId, { idField: 'id' }) as Observable<Post[]>;
  }
  
  getPostsWithFilter(filter: string = ''): Observable<Post[]> {
    console.log('filter:', filter);
    const postId = collection(this.firestore, 'posts');
    let postsQuery = query(postId);
  
    if (filter !== '') {
      /*const lowercaseFilter = filter.toLowerCase();
      postsQuery = query(postId, where('title', '!=', lowercaseFilter));*/
    }
  
    return collectionData(postId, { idField: 'id' })
      .pipe(
        map(posts => {
          if (filter !== '') {
            const regexFilter = new RegExp(filter.toLowerCase(), 'i');
            return posts
              .filter(post => regexFilter.test(post['title']))
              .map(postData => ({
                id: postData['id'],
                title: postData['title'],
                autor: postData['autor'],
                description: postData['description'],
                document: postData['document']
              }));
          }
          return posts.map(postData => ({
            id: postData['id'],
            title: postData['title'],
            autor: postData['autor'],
            description: postData['description'],
            document: postData['document']
          }));
        })
      );
  }
}
