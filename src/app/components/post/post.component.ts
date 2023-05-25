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
  myPost: boolean = false;
  likeImageSrc: string = '';
  commentText: string = '';

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.checkLikeStatus();
  }

  async checkLikeStatus() {
    const user = await this.firebaseService.userObserver();
    if (user) {
      const postId = this.post?.id || '';
      this.hasLiked = this.post?.likesBy?.includes(user.uid) || false;
      this.myPost = this.post?.userId == user.uid || false;
    }
    this.updateLikeImageSrc();
  }

  async likePost() {
    console.log('like');
    if (this.post && this.post.likes != null && !this.hasLiked) {
      this.post.likes++;
      this.hasLiked = true;
      const postId = this.post.id || '';
      await this.firebaseService.updatePostLikes(postId);
      this.updateLikeImageSrc();
    }
  }
  
  async unlikePost() {
    console.log('unlike');
    if (this.post && this.post.likes != null && this.hasLiked) {
      console.log('unlike', this.post)
      this.post.likes--;
      this.hasLiked = false;
      const postId = this.post.id || '';
      try {
        await this.firebaseService.removePostLike(postId);
        this.updateLikeImageSrc();
      } catch (error) {
        console.error('Error al quitar el like:', error);
      }
    }
  }

  updateLikeImageSrc() {
    this.likeImageSrc = this.hasLiked ? 'assets/like_icon.png' : 'assets/no_like_icon.png' ;
  }

  async saveComment() {
    if (this.commentText.trim() === '') {
      return;
    }
  
    const postId = this.post?.id || '';
    try {
      await this.firebaseService.saveComment(postId, this.commentText.trim());
      this.commentText = '';
    } catch (error) {
      console.error('Error al guardar el comentario:', error);
      
    }
  }

  deletePost() {
    this.firebaseService.deletePost(this.post);
  }
}
