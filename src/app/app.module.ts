import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AngularFireModule } from '@angular/fire/compat';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DashboardMaterialComponent } from './componentes/dashboard-material/dashboard-material.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AdminComponent } from './componentes/admin/admin.component';
import { DatosUsuarioComponent } from './componentes/datos-usuario/datos-usuario.component';
import { PostsComponent } from './componentes/posts/posts.component';
import { CrearPostComponent } from './crear-post/crear-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    DashboardMaterialComponent,
    AdminComponent,
    DatosUsuarioComponent,
    PostsComponent,
    CrearPostComponent,
    ListaUsuariosComponent,
    EditarUsuarioComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatSlideToggleModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    
    AngularFireModule.initializeApp(environment),
         NgbModule,
         BrowserAnimationsModule,
         MatGridListModule,
         MatCardModule,
         MatMenuModule,
         MatIconModule,
         MatButtonModule,
         MatToolbarModule,
         MatSidenavModule,
         MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
