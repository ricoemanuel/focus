import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Post } from '../post/post.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  posts: Post[] = [];
  user: any = {};
  showForm = false;
  editedBiography = '';

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit() {
    this.loadUserInfo();
    this.firebaseService.getPostByUser(localStorage.getItem('useruidg')?? '').subscribe(posts => {
      this.posts = posts;
    });
  }

  loadUserInfo() {
    this.firebaseService.getUserInfo()
      .then((userInfo) => {
        console.log('profile', userInfo);
        const fechaEnMilisegundos = userInfo['birthdate'].seconds * 1000;
        const fecha = new Date(fechaEnMilisegundos);
        this.user = {
          fullname: userInfo['firstName'] + ' ' + userInfo['lastName'],
          email: userInfo['email'],
          profilePicture: userInfo['photoUrl'],
          dateOfBirth: fecha.toLocaleDateString(),
          biography: userInfo['biography'],
        
        }
      })
      .catch((error) => {
        console.error('Error al cargar la información del usuario:', error);
      });
  }

  showEditForm() {
    this.showForm = true;
    this.editedBiography = this.user.biography;
  }

  saveBiography() {
    this.user.biography = this.editedBiography;
    this.firebaseService.updateUserBiography(this.editedBiography);
    this.showForm = false; 
  }
  
  selectedFile: File | undefined;

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      this.openFilePicker();
    }
  }
  
  openFilePicker() {
    if (this.selectedFile) {
      this.firebaseService.saveProfilePicture(this.selectedFile)
        .then(() => {
          console.log('Foto de perfil guardada exitosamente');
          window.location.reload();
        })
        .catch(error => {
          console.error('Error al guardar la foto de perfil:', error);
        });
    } else {
      console.warn('No se ha seleccionado ningún archivo');
    }
  }
}
