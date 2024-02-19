import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-dashboard-material',
  templateUrl: './dashboard-material.component.html',
  styleUrls: ['./dashboard-material.component.css']
})
export class DashboardMaterialComponent {
  private breakpointObserver = inject(BreakpointObserver);
  constructor(private AuthService: AuthService) {

  }


  logOut() {
    this.AuthService.logOut();
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
