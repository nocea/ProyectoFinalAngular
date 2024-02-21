import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { inject } from '@angular/core';


export const adminGuardGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
    const router = inject(Router);
    const user=authService.currentUser();
    const rol_usuario=authService.getRoleByEmail(user.email);
    if (await rol_usuario === "ADMIN") {
      console.log("es admin");
      return true; // Si el rol es "ADMIN", permite el acceso
    } else {
      console.log("no es admin");
      // Si el rol no es "ADMIN", redirige a otra página (por ejemplo, la página de inicio)
      router.navigate(['/dashboard-material']); // Puedes cambiar '/' con la ruta a la que deseas redirigir
      return false; // No permite el acceso
    }
};
