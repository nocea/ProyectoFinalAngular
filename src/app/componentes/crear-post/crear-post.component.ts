import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/interfaces/usuario'; // Asegúrate de importar Usuario desde la ubicación correcta
import { Post } from 'src/app/interfaces/post';// Asegúrate de importar Post desde la ubicación correcta
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-crear-post',
  templateUrl: './crear-post.component.html',
  styleUrls: ['./crear-post.component.css']
})
export class CrearPostComponent {

  titulo: string = '';
  pie: string = '';
  imagen: File | null = null;


  constructor(private authService: AuthService,private route: ActivatedRoute,private router: Router) {}


  onSubmit() {
    console.log("entra submit")
    if (this.titulo && this.pie) {
          const post: Post = {
            ruta_imagen: null,
            titulo_imagen: this.titulo,
            pie_imagen: this.pie,
            usuario: null // Aquí debes proporcionar los detalles del usuario
            ,
            id: ''
          };
          this.guardarPostFirestore(post);
          this.router.navigate(['/dashboard-material/paraTi']);
    } else {
      alert('Por favor, completa todos los campos y selecciona una imagen.');
    }
  }
  
  
  
  guardarPostFirestore(post: Post) {
    console.log("entra en guardar")
    this.authService.guardarPost1(post)
      .then(response => {
        console.log('Post guardado en Firestore:', response);
        
        // Aquí podrías manejar el éxito de la operación
      })
      .catch(error => {
        console.error('Error al guardar el post en Firestore:', error);
        // Aquí podrías manejar el error
      });
  }

  convertirImagenBase64(imagen: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imagen);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = error => reject(error);
    });
  }
}
