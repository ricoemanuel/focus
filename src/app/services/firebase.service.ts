import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, addDoc, collectionData, getDoc, query, where, CollectionReference  } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { Post } from '../components/post/post.model';
import { CommentPost } from '../components/post/comment.post.model';
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
      let userActive = this.getPersona(user.uid);
      return userActive;
    }
    return undefined;
  }

  async savePost(post: Post, file: any) {
    const userObserver = this.userObserver();
    const user = await this.getPersonaActiva();
    if (user && userObserver) {
      try {
        const fileUrl = await this.uploadImage(file);
        post.userId = userObserver.uid;
        post.autor = user['firstName'] + ' ' + user['lastName'];
        post.document = fileUrl;
        post.likes = 0;
        post.likesBy = []
        post.comments = []
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
                userId: postData['userId'],
                title: postData['title'],
                autor: postData['autor'],
                description: postData['description'],
                document: postData['document'],
                likes: postData['likes'],
                likesBy: postData['likesBy'],
                comments: postData['comments']
              }));
          }
          return posts.map(postData => ({
            id: postData['id'],
            userId: postData['userId'],
            title: postData['title'],
            autor: postData['autor'],
            description: postData['description'],
            document: postData['document'],
            likes: postData['likes'],
            likesBy: postData['likesBy'],
            comments: postData['comments']
          }));
        })
      );
  }


  async updatePostLikes(postId: string) {
    const user = this.userObserver();
   
    if (user == null || user.uid == null) {
      throw new Error('No se pudo obtener el usuario activo.');
    } 
    
    const userId = user?.uid;

    const postRef = doc(this.firestore, 'posts', postId);
    const postSnapshot = await getDoc(postRef);
    if (postSnapshot.exists()) {
      const post = postSnapshot.data() as Post;
      if (post.likes === undefined) {
        post.likes = 1;
      } else {
        post.likes++;
      }
      if (!post.likesBy) {
        post.likesBy = [userId];
      } else {
        if (!post.likesBy.includes(userId)) {
          post.likesBy.push(userId);
        } else {
          throw new Error('El usuario ya ha dado like a esta publicación.');
        }
      }
      await setDoc(postRef, post, { merge: true });
    } else {
      throw new Error('El post no existe');
    }
  }

  async removePostLike(postId: string) {
    const user = this.userObserver();
     
    if (user == null || user.uid == null) {
      throw new Error('No se pudo obtener el usuario activo.');
    } 
    
    const userId = user?.uid;
  
    const postRef = doc(this.firestore, 'posts', postId);
    const postSnapshot = await getDoc(postRef);
    if (postSnapshot.exists()) {
      const post = postSnapshot.data() as Post;
      if (post.likes === undefined || post.likes <= 0) {
        throw new Error('El post no tiene likes para remover.');
      }
      
      const likeIndex = post.likesBy?.indexOf(userId);
      if (likeIndex !== undefined && likeIndex !== -1) {
        post.likes--;
        post.likesBy?.splice(likeIndex, 1);
        await setDoc(postRef, post, { merge: true });
      } else {
        throw new Error('El usuario no ha dado like a esta publicación.');
      }
    } else {
      throw new Error('El post no existe');
    }
  }

  async saveComment(postId: string, comment: string) {
    const userObserver = this.userObserver();

    const user = await this.getPersonaActiva();
    
    if (user == null || userObserver == null) {
      throw new Error('No se pudo obtener el usuario activo.');
    }
    
    const postRef = doc(this.firestore, 'posts', postId);
    const postSnapshot = await getDoc(postRef);
    if (postSnapshot.exists()) {
      const post = postSnapshot.data() as Post;
      if (!post.comments) {
        post.comments = [];
      }
      const newComment: CommentPost = {
        userId: userObserver.uid,
        user: user['firstName'] + ' ' + user['lastName'],
        comment: comment
      };
      post.comments.push(newComment);
      console.log(newComment)
      await setDoc(postRef, post, { merge: true });
    } else {
      throw new Error('El post no existe');
    }
  }
}
