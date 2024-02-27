import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit{
  usuario: Usuario | undefined;
  alias_usuario!:string;
  email_usuario!:string;
  rol_usuario!:string;
  constructor(
    private route: ActivatedRoute,
    private authservice:AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      // Convertimos id a string y luego lo pasamos al método
      this.authservice.getUsuarioEditar(id).subscribe(usuario => {
        this.usuario = usuario;
        this.alias_usuario=this.usuario.alias_usuario;
        this.email_usuario=this.usuario.email_usuario;
        this.rol_usuario=this.usuario.rol_usuario;
        console.log(usuario);
      });
    } else {
      // Manejar el caso en que id es null, por ejemplo, redirigir a una página de error
    }
  }
  async onUpdateUsuario(id: string, newData: any): Promise<void> {
    try {
      await this.authservice.updateUsuario(id, newData);
      console.log('Usuario actualizado exitosamente');
      // Realiza cualquier otra lógica después de la actualización
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      // Maneja el error apropiadamente en tu componente
    }
  }

  onSubmit(): void {
    if (this.usuario) {
      const newData = {
        alias_usuario: this.alias_usuario,
        email_usuario: this.email_usuario,
        rol_usuario: this.rol_usuario
      };
      this.onUpdateUsuario(this.usuario.id, newData);
    }
    this.router.navigate(['/admin/listaUsuarios']);
  }
}
