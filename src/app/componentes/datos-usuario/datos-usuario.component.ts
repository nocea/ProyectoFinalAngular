import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/interfaces/usuario';
@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent {
  currentUser: any;
  usuarioEncontrado!: Usuario;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    // Obtener el usuario actual cuando se inicializa el componente
    this.currentUser = this.authService.currentUser();
    console.log(this.currentUser);
    this.authService.findUserByEmail(this.currentUser.email).then((userData) => {
      if (userData) {
        // Se encontró el usuario, userData contiene los datos del usuario
        this.usuarioEncontrado=userData;
        console.log(userData);
      } else {
        // No se encontró el usuario en Firestore
        console.log('El usuario no está registrado en Firestore');
      }
    }).catch((error) => {
      console.error('Error al buscar el usuario por email:', error);
    });
  }
  borrarPerfil(emailUsuario: string) {
    this.authService.borrarUsuario(emailUsuario).then(() => {
      console.log('Perfil borrado exitosamente');
      // Aquí puedes realizar alguna acción adicional después de borrar el perfil si es necesario
    }).catch((error) => {
      console.error('Error al intentar borrar el perfil:', error);
    });
  }
}
