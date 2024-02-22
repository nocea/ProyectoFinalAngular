import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardMaterialComponent } from './componentes/dashboard-material/dashboard-material.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { adminGuardGuard } from './guards/admin-guard.guard';
import { DatosUsuarioComponent } from './componentes/datos-usuario/datos-usuario.component';
import { CrearPostComponent } from './crear-post/crear-post.component';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'dashboard-material', 
    component: DashboardMaterialComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'datosUsuario', component: DatosUsuarioComponent },
      { path: 'crearPost', component: CrearPostComponent }, // Ruta dentro de DashboardMaterialComponent
      // Otras rutas secundarias de DashboardMaterialComponent si es necesario
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegistroComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, adminGuardGuard],
  children: [
    { path: 'listaUsuarios', component: ListaUsuariosComponent },
    { path: 'editar-usuario/:id', component: EditarUsuarioComponent },
  ]
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
