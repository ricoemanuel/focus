import { Component, Input } from '@angular/core';
import { Post } from './post.model';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post?: Post;
  hasLiked: boolean = false;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.checkLikeStatus();
  }

  async checkLikeStatus() {
    const user = await this.firebaseService.userObserver();
    if (user) {
      const postId = this.post?.id || '';
      this.hasLiked = this.post?.likesBy?.includes(user.uid) || false;
    }
  }

  async likePost() {
    console.log('like');
    if (this.post && this.post.likes && !this.hasLiked) {
      this.post.likes++;
      this.hasLiked = true;
      const postId = this.post.id || '';
      await this.firebaseService.updatePostLikes(postId);
    }
  }
}
