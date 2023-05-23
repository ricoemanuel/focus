import { Component } from '@angular/core';
import { Post } from '../post/post.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isPopupVisible = false;
  newPost: Post = { title: '', autor: '', description: '' , document: ''};
  posts: Post[] = [];

  createPost(post: Post) {
    // Aquí puedes agregar la lógica para almacenar el nuevo post, por ejemplo, enviar una solicitud HTTP al servidor
    this.posts.push(post);
    this.closePopup();
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }
}
