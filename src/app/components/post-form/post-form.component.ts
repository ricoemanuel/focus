import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post/post.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  post: Post = { title: '', autor: '', description: '', document: '' };
  @Output() create: EventEmitter<Post> = new EventEmitter<Post>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  createPost() {
    // Aquí puedes agregar la lógica para crear el post, por ejemplo, enviar una solicitud HTTP al servidor
    this.create.emit(this.post);
  }

  cleanForm() {
    this.close.emit();
  }
}
