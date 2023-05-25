import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Post } from '../post/post.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  posts: Post[] = [];

  user: any = {
    fullname: 'Faber Muñoz',
    email: 'faber.munoz@mailinator.com',
    profilePicture: 'https://firebasestorage.googleapis.com/v0/b/focus-udem.appspot.com/o/images%2FuYd9g27QmFO7eZRtg8qKoVPVJyb2.jpg?alt=media&token=ee702bc6-01be-4bf2-b5f4-c63a53b21daf',
    dateOfBirth: '03 / 08 / 2000',
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices augue tortor. Nulla efficitur hendrerit porttitor. Quisque at tortor sed risus dapibus ullamcorper. Donec a sodales felis, finibus ullamcorper eros. Etiam at nisi placerat, ultrices eros a, condimentum nunc. Aliquam faucibus mi id sapien scelerisque egestas. Nulla auctor dolor in viverra pellentesque. Phasellus pulvinar egestas urna in feugiat. Proin semper sed est at semper. Suspendisse quis venenatis risus. Morbi posuere porttitor elit ac porta. Nullam a congue mi, vel molestie orci. Mauris eget interdum justo. Praesent a lacus sit amet urna sodales malesuada.',
  };

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    //this.user = this.firebaseService.getUserProfile();
    this.firebaseService.getPostByUser(localStorage.getItem('user')?? '').subscribe(posts => {
      this.posts = posts;
      console.log('OK');
    });
  }
}
