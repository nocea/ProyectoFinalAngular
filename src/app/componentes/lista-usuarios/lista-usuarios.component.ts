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
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    //guardo los candidatos en la lista
    this.authService.getUsuarios().subscribe(usuarios => {
      // Filtrar usuarios que no tienen el rol 'ADMIN'
      usuarios.forEach(usuario => {
        if (usuario.rol_usuario !== 'ADMIN') {
          this.usuarios.push(usuario);
        }
      });
      console.log(this.usuarios);
    });
   
  }
  editarUsuario(usuario: Usuario): void {
    const usuarioId = usuario.id; // Asumiendo que cada usuario tiene una propiedad 'id'
    this.router.navigate(['/admin/editar-usuario', usuarioId]);
  }
}
