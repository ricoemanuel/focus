import { Component, OnInit } from '@angular/core';
import { Post } from '../post/post.model';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit{
  posts: Post[];

  constructor(private firebaseService: FirebaseService) {
    this.posts = [
      { id: '1', title: 'Título del Post 1', autor: '', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime blanditiis cumque ratione tempora ex ad, minima reprehenderit debitis iste odio, cum dolorem dolores consequatur temporibus nam labore est architecto. Esse. Libero, repudiandae laborum aut perspiciatis dolorum impedit vel assumenda, perferendis blanditiis sint pariatur! Enim laboriosam consequuntur corporis in voluptatem libero nesciunt iste incidunt, dolorem rem excepturi voluptates sequi eaque autem!Natus minima deleniti aperiam sunt iure fugit expedita exercitationem totam ducimus officiis. Magnam pariatur ipsam eum, blanditiis nihil sint laborum deleniti aspernatur et, sit veniam dolores autem est neque consequatur?Quos rerum eveniet, ipsam culpa ut dolore? Asperiores veniam inventore voluptates architecto provident molestias rerum, exercitationem dignissimos reiciendis ullam eveniet sapiente ipsum obcaecati ipsam harum. Nulla reiciendis autem ratione aspernatur!', document: 'document1.pdf' },
      { id: '2', title: 'Título del Post 2', autor: '', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime blanditiis cumque ratione tempora ex ad, minima reprehenderit debitis iste odio, cum dolorem dolores consequatur temporibus nam labore est architecto. Esse. Libero, repudiandae laborum aut perspiciatis dolorum impedit vel assumenda, perferendis blanditiis sint pariatur! Enim laboriosam consequuntur corporis in voluptatem libero nesciunt iste incidunt, dolorem rem excepturi voluptates sequi eaque autem!Natus minima deleniti aperiam sunt iure fugit expedita exercitationem totam ducimus officiis. Magnam pariatur ipsam eum, blanditiis nihil sint laborum deleniti aspernatur et, sit veniam dolores autem est neque consequatur?Quos rerum eveniet, ipsam culpa ut dolore? Asperiores veniam inventore voluptates architecto provident molestias rerum, exercitationem dignissimos reiciendis ullam eveniet sapiente ipsum obcaecati ipsam harum. Nulla reiciendis autem ratione aspernatur!', document: 'document2.pdf' },
      { id: '3', title: 'Título del Post 3', autor: '', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime blanditiis cumque ratione tempora ex ad, minima reprehenderit debitis iste odio, cum dolorem dolores consequatur temporibus nam labore est architecto. Esse. Libero, repudiandae laborum aut perspiciatis dolorum impedit vel assumenda, perferendis blanditiis sint pariatur! Enim laboriosam consequuntur corporis in voluptatem libero nesciunt iste incidunt, dolorem rem excepturi voluptates sequi eaque autem!Natus minima deleniti aperiam sunt iure fugit expedita exercitationem totam ducimus officiis. Magnam pariatur ipsam eum, blanditiis nihil sint laborum deleniti aspernatur et, sit veniam dolores autem est neque consequatur?Quos rerum eveniet, ipsam culpa ut dolore? Asperiores veniam inventore voluptates architecto provident molestias rerum, exercitationem dignissimos reiciendis ullam eveniet sapiente ipsum obcaecati ipsam harum. Nulla reiciendis autem ratione aspernatur!', document: 'docuemnt3.pdf' }
    ];
  }

  ngOnInit(): void {
    this.firebaseService.getPosts () . subscribe (posts => {
      this.posts = posts;
    })
  }
}
