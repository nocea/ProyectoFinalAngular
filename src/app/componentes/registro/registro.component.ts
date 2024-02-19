import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  constructor(private AuthService: AuthService) {

  }
  signUp(email: string, password: string) {
    this.AuthService.signUpWithEmailAndPassword(email, password);
  }
}