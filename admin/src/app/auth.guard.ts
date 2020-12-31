import { Route } from '@angular/compiler/src/core';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
    isAuthenticated: boolean = false;
    
    constructor(private router: Router, private authService: AuthService) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.authService.clearAuthData();
            this.router.navigate(['/login']);
            return false;
        }
    }

    canLoad(): boolean {
        return true;
    }
}
