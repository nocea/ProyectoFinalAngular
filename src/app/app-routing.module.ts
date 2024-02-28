import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardMaterialComponent } from './componentes/dashboard-material/dashboard-material.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { adminGuardGuard } from './guards/admin-guard.guard';
import { DatosUsuarioComponent } from './componentes/datos-usuario/datos-usuario.component';
import { CrearPostComponent } from './componentes/crear-post/crear-post.component';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { ComentarPostComponent } from './componentes/comentar-post/comentar-post.component';
import { ParaTiComponent } from './componentes/para-ti/para-ti.component';
import { ListaPostsComponent } from './componentes/lista-posts/lista-posts.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'dashboard-material', 
    component: DashboardMaterialComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'datosUsuario', component: DatosUsuarioComponent },
      { path: 'crearPost', component: CrearPostComponent },
      { path: 'paraTi', component: ParaTiComponent },
      { path: 'comentar/:id', component: ComentarPostComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegistroComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, adminGuardGuard],
  children: [
    { path: 'listaUsuarios', component: ListaUsuariosComponent },
    { path: 'editar-usuario/:id', component: EditarUsuarioComponent },
    { path: 'listaPosts', component: ListaPostsComponent },
  ]
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
