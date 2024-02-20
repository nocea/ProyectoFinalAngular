import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, setDoc } from '@angular/fire/firestore';
import { Usuario }from '../interfaces/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private firestore :Firestore
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

  // log-in with google
  logInWithGoogleProvider() {
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
      .then((userCredential) => {
        // Aquí tienes acceso al usuario autenticado
        const user = userCredential.user;
        
        // Puedes acceder a los datos del usuario
        console.log("Usuario autenticado:", user);
  
        // Luego, puedes observar el estado del usuario
        return this.observeUserState();
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
        this.observeUserState()
        const usuarioRef=collection(this.firestore,'usuarios');
        return addDoc(usuarioRef,usuario);
      })
      .catch((error) => {
        alert("El email ya está registrado en la base de datos o no es el formato correcto de email");
      })
  }

  observeUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['dashboard-material']))
    })
  }

  // return true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  // logOut
  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

}