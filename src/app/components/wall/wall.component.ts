import { Component } from '@angular/core';
import { Post } from '../post/post.model';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent {
  posts: Post[] = [
    { id: '1', title: 'Título del Post 1', description: 'Descripción del Post 1', document: 'document1.pdf' },
    { id: '2', title: 'Título del Post 2', description: 'Descripción del Post 2', document: 'document2.pdf' },
    { title: 'Título del Post 3', description: 'Descripción del Post 3', document: 'docuemnt3.pdf' }
  ];
}
