import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post/post.model';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  post: Post = { title: '', autor: '', description: '', document: '' };

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  async createPost() {
    const documentInput = document.getElementById('document') as HTMLInputElement;
    if (documentInput && documentInput.files) {
      const file = documentInput.files[0]
      const response = await this.firebaseService.savePost(this.post, file);
      Swal.fire({
        icon: 'success',
        title: 'Publicación exitosa',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/home']);
    }
  }

  cleanForm() {
    this.post = { title: '', autor: '', description: '', document: '' };
  }
}
