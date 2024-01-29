import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private AuthService: AuthService) {

  }


  logOut() {
    this.AuthService.logOut();
  }
}