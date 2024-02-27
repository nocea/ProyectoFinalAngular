import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-para-ti',
  templateUrl: './para-ti.component.html',
  styleUrls: ['./para-ti.component.css']
})
export class ParaTiComponent implements OnInit{
  posts$!: Observable<Post[]>;

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.posts$ = this.authService.getPosts();
  }
  comentarPost(post: Post) {
    // Aquí puedes realizar cualquier acción relacionada con el post comentado
    console.log('Post comentado:', post);
    // Por ejemplo, podrías navegar a otra ruta y pasar el post como parámetro
    this.router.navigate(['/dashboard-material/comentar', post.id]);
  }
  
}
