import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from '../../interfaces/usuario';
import { FormBuilder, FormControl, FormGroup, MaxValidator, Validators,} from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  
  
  signupForm!: FormGroup;
  constructor(private authService: AuthService,private fb: FormBuilder) {}
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email_usuario: ['', [Validators.required, Validators.email]],
      password_usuario: ['', [Validators.required]],
      alias_usuario: ['', [Validators.required]],
      rol_usuario:'USUARIO'

    });
  }
  onSubmit() {
    console.log(this.signupForm.value)
    //llamo al metodo para guardar
    this.authService.signUpWithEmailAndPassword(this.signupForm.value);
  }
}
