import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, OnSameUrlNavigation, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Comentario } from 'src/app/interfaces/comentario';
import { Post } from 'src/app/interfaces/post';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-comentar-post',
  templateUrl: './comentar-post.component.html',
  styleUrls: ['./comentar-post.component.css']
})
export class ComentarPostComponent implements OnInit {
  idpost!: string;
  post!: Observable<Post>;  
  usuario!: Usuario | null;
  postComentar!:Post|null;
  comentario!:Comentario;
  noComentario!: string;
  form = this.fb.group({
    texto_comentario: ['', Validators.required],
  });
  constructor(
    private route: ActivatedRoute,
    private authservice: AuthService,
    private router: Router,
    private fb:FormBuilder
  ) { }
  commentForm!: FormGroup;
  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.idpost = id;
      this.authservice.getPost(id).subscribe((post: Post) => {
        this.postComentar=post;
        console.log("postcomoentar",this.postComentar);
      });
    }
    
    // Llamar al método para obtener el usuario actual
    this.authservice.getCurrentUser().then((usuario: Usuario | null) => {
      this.usuario = usuario;
      
      console.log("usuariocomentario ",this.usuario);
      // Después de obtener el usuario, puedes inicializar el formulario
    });
  }

  enviar() {
    if (this.form.valid) {
      if (this.postComentar && this.usuario&&this.form.value.texto_comentario) {
        // Envía el comentario con el post y el usuario
        this.comentario = {
          texto_comentario: this.form.value.texto_comentario,
          post_comentario: this.postComentar,
          usuario_comentario: this.usuario
        };
        this.authservice.crearComentario(this.comentario);
        this.router.navigate(['/dashboard-material/paraTi']);
        // Aquí puedes llamar a un método de servicio para enviar el comentario
      } else {
        console.error("No se puede enviar el comentario: postComentar o usuario es null o undefined.");
      }
    }
  }
}
