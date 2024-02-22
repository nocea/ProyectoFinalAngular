import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit{
  usuario: Usuario = {
    id: '', alias_usuario: '', email_usuario: '', rol_usuario: '',
    password_usuario: ''
  };
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.authService.getUsuario(userId).subscribe(usuario => {
      this.usuario = usuario;
    });
    console.log(this.usuario);
  }
  //
}
