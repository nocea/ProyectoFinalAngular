import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit{
  usuarios: Usuario[] = [];
  filtroNombre: string = '';
  router!: Router;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    //guardo los candidatos en la lista
    this.authService.getUsuarios().subscribe(usuario => {
      this.usuarios = usuario;
      this.usuarios = this.usuarios.filter(usuario => usuario.rol_usuario !== "ADMIN");
    })
   
  }
  delUsuario(usuario: Usuario) {
    this.authService.delusuario(usuario);
  }
  editarUsuario(usuario: Usuario) {
    // Redirige a un componente de edición y pasa el ID del usuario como parámetro
    this.router.navigate(['/editar-usuario', usuario.id]);
  }
}
