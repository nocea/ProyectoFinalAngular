import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider, deleteUser, getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { Comentario } from '../interfaces/comentario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getPostEditar(id: string) {
    throw new Error('Method not implemented.');
  }
  userData: any;
  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private firestore :Firestore,
    private afAuth: AngularFireAuth
  ) {
    // OBSERVER save user in localStorage (log-in) and setting up null when log-out
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    })

  }
  crearComentario(comentario: Comentario) {
  const comentarioRef = collection(this.firestore, 'comentarios');
  addDoc(comentarioRef, comentario);
}
      async guardarPost1(post: Post): Promise<void> {
        try {
            const user = await this.firebaseAuthenticationService.currentUser;
            if (user && user.email) {
                const userEmail = user?.email;
                const usuario = await this.findUserByEmail(userEmail);
                if (usuario) {
                    post.usuario = usuario;
                    const postRef = collection(this.firestore, 'posts');
                    await addDoc(postRef, post);
                    console.log('Post agregado exitosamente.');
                }
            }
        } catch (error) {
            console.error('Error al agregar el post:', error);
            throw error; // Propagar el error para que el componente pueda manejarlo
        }
      }
      async getCurrentUser(): Promise<Usuario | null> {
        try {
          const user = await this.firebaseAuthenticationService.currentUser;
          
          if (user && user.email) {
              const userEmail = user?.email;
              
              const usuario = await this.findUserByEmail(userEmail);
            
              if (usuario) {
                  return usuario;
              }else{
                return null;
              }
          }
          else{
            return null;
          }
      } catch (error) {
          console.error('Error al agregar el post:', error);
          throw error; // Propagar el error para que el componente pueda manejarlo
      }
      }
  getComentariosPorPost(postId: string): Observable<Comentario[]> {
      const comentariosRef = collection(this.firestore, 'comentarios');
      const queryRef = query(comentariosRef, where('post.id', '==', postId));
      return collectionData(queryRef, { idField: 'id' }) as Observable<Comentario[]>;
    }
  getUsuarios():Observable<Usuario[]>{
    const usuarioRef=collection(this.firestore,'usuarios');
    return collectionData(usuarioRef,{idField:'id'})as Observable<Usuario[]>;
  }
  getPosts(): Observable<Post[]> {
    const postsRef = collection(this.firestore, 'posts');
    return collectionData(postsRef, { idField: 'id' }) as Observable<Post[]>;
  }
  getUsuario(id: string) {
    const elementDocRef = doc(this.firestore, `usuario/${id}`);
    return docData(elementDocRef, { idField: 'id' }) as Observable<any>;
  }
  getPost(id: string): Observable<Post> {
    const elementDocRef = doc(this.firestore, `posts/${id}`);
    return docData(elementDocRef, { idField: 'id' }) as Observable<Post>;
  }
  getUsuarioEditar(id: string): Observable<Usuario> {
    const elementDocRef = doc(this.firestore, `usuarios/${id}`);
    return docData(elementDocRef, { idField: 'id' }) as Observable<Usuario>;
  }
  // log-in with email and password
  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user
        this.observeUserState()
      })
      .catch((error) => {
        alert("El usuario no existe en la base de datos");
      })
  }
  async updateUsuario(id: string, data: any): Promise<void> {
    try {
      const usuarioRef = doc(this.firestore, `usuarios/${id}`);
      await setDoc(usuarioRef, data, { merge: true });
      console.log('Usuario actualizado exitosamente en Firestore');
    } catch (error) {
      console.error('Error al actualizar el usuario en Firestore:', error);
      throw error; // Propaga el error para que el componente pueda manejarlo
    }
  }
async borrarUsuario(email: string): Promise<void> {
    try {
      const user = await this.firebaseAuthenticationService.currentUser;
      if (user) {
        await user.delete();
        console.log('Usuario borrado exitosamente de Firebase Authentication');
      } else {
        console.log('No hay usuario autenticado');
        return;
      }

      // Luego, borramos el usuario de Firestore
      const usuariosRef = collection(this.firestore, 'usuarios');
      const queryRef = query(usuariosRef, where('email_usuario', '==', email));
      const querySnapshot = await getDocs(queryRef);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        console.log('Usuario borrado exitosamente de Firestore');
      } else {
        console.log('No se encontró ningún usuario con ese email');
      }
    } catch (error) {
      console.error('Error al borrar el usuario:', error);
    }
  }
  // log-in with google
  logInWithGoogleProvider() {
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = userCredential.user?.uid;
        if (user !== null) {
          // Verificar si el usuario ya existe en Firestore
          const usuariosRef = collection(this.firestore, 'usuarios');
          const queryRef = query(usuariosRef, where('email_usuario', '==', user.email));
  
          getDocs(queryRef).then((querySnapshot) => {
            if (querySnapshot.size > 0) {
              // El usuario ya existe, no es necesario agregarlo nuevamente
              console.log("El usuario ya existe en Firestore");
            } else {
              // El usuario no existe, agregarlo a Firestore
              const usuarioNuevo = {
                email_usuario: user.email || '',
                alias_usuario: user.displayName || '',
                rol_usuario: "USUARIO",
                id_firestore:uid,
                password_usuario: '',

              };
  
              addDoc(usuariosRef, usuarioNuevo)
                .then(() => {
                  console.log("Usuario agregado a Firestore");
                })
                .catch((error) => {
                  console.error('Error al guardar el usuario en Firestore:', error);
                });
            }
          }).catch((error) => {
            console.error('Error al verificar la existencia del usuario en Firestore:', error);
          });
  
          // Continuar con el inicio de sesión normal
          this.observeUserState();
        } else {
          throw new Error("El usuario es nulo.");
        }
      })
      .catch((error) => {
        alert("No se ha podido iniciar sesión con Google");
      });
  }
  // sign-up with email and password
  signUpWithEmailAndPassword(usuario:Usuario) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(usuario.email_usuario, usuario.password_usuario)
    
      .then((userCredential) => {
        this.userData = userCredential.user
        const uid = userCredential.user?.uid;
        this.observeUserState()
        const usuarioRef=collection(this.firestore,'usuarios');
        usuario.id_firestore = uid;
        return addDoc(usuarioRef,usuario);
      })
      .catch((error) => {
        alert("El email ya está registrado en la base de datos o no es el formato correcto de email");
      })
  }
  observeUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      if (userState) {
        const usuariosRef = collection(this.firestore, 'usuarios');
        const queryRef = query(usuariosRef, where('email_usuario', '==', userState.email));
        
        getDocs(queryRef).then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data() as Usuario;
              if (userData.rol_usuario === 'ADMIN') {
                this.ngZone.run(() => this.router.navigate(['admin']));
              } else if (userData.rol_usuario === 'USUARIO') {
                this.ngZone.run(() => this.router.navigate(['dashboard-material']));
              }
            });
          } else {
            // El usuario no está en Firestore
            console.log('El usuario no está registrado en Firestore');
            // Aquí podrías redirigir a una página para manejar este caso
          }
        }).catch((error) => {
          console.error('Error al verificar la existencia del usuario en Firestore:', error);
          // Aquí podrías manejar el error de alguna manera apropiada
        });
      } else {
        // El usuario no ha iniciado sesión
        console.log('El usuario no ha iniciado sesión');
        // Aquí podrías redirigir a la página de inicio de sesión
        this.router.navigate(['login']);
      }
    });
  }
  async getRoleByEmail(email: string): Promise<string | null> {
    try {
      const usuariosRef = collection(this.firestore, 'usuarios');
      const queryRef = query(usuariosRef, where('email_usuario', '==', email));
      const querySnapshot = await getDocs(queryRef);
  
      if (!querySnapshot.empty) {
        let role: string | null = null;
        querySnapshot.forEach((doc) => {
          const userData = doc.data() as Usuario;
          role = userData.rol_usuario;
        });
        return role;
      } else {
        // El usuario no está en Firestore
        console.log('El usuario no está registrado en Firestore');
        return null;
      }
    } catch (error) {
      console.error('Error al verificar la existencia del usuario en Firestore:', error);
      return null;
    }
  }
  async findUserByEmail(email: string): Promise<Usuario | null> {
    try {
      const usuariosRef = collection(this.firestore, 'usuarios');
      const queryRef = query(usuariosRef, where('email_usuario', '==', email));
      const querySnapshot = await getDocs(queryRef);

      if (!querySnapshot.empty) {
        let userData: Usuario | null = null;
        querySnapshot.forEach((doc) => {
          userData = doc.data() as Usuario;
        });
        return userData;
      } else {
        // El usuario no está en Firestore
        console.log('El usuario no está registrado en Firestore');
        return null;
      }
    } catch (error) {
      console.error('Error al verificar la existencia del usuario en Firestore:', error);
      return null;
    }
  }
  // return true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
  currentUser() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  } 
  // logOut
  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

}