import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post/post.model';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  post: Post = { title: '', autor: '', description: '', document: '' };
  @Output() create: EventEmitter<Post> = new EventEmitter<Post>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  async createPost() {
    const response = await this.firebaseService.savePost(this.post);
    this.router.navigate(['/home']);
    //this.create.emit(this.post);
  }

  cleanForm() {
    this.close.emit();
  }
}
