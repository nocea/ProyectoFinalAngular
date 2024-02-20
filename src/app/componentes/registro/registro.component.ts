import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-sign-up',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  constructor(private authService: AuthService) {}

  signUp(email: string, password: string, alias: string) {
    const usuarioNuevo: Usuario = {
      email_usuario: email,
      alias_usuario: alias,
      password_usuario:password,
      rol_usuario: "USUARIO"
    };

    this.authService.signUpWithEmailAndPassword(usuarioNuevo)
      .then(() => {
        // Manejar éxito de registro aquí si es necesario
        console.log('Usuario creado correctamente');
      })
      .catch(error => {
        // Manejar error de registro aquí si es necesario
        console.error('Error al crear usuario:', error);
      });
  }
}
