import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-lista-posts',
  templateUrl: './lista-posts.component.html',
  styleUrls: ['./lista-posts.component.css']
})
export class ListaPostsComponent implements OnInit{
  posts: Post[] = [];
  filtroNombre: string = '';
  constructor(private authService: AuthService,private router: Router) { }
  ngOnInit(): void {
    this.authService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
    console.log(this.posts);
  }
  borrarPost(post: Post): void {
    const postID = post.id; // Asumiendo que cada usuario tiene una propiedad 'id'
    this.authService.borrarPost(postID);
  }
}
